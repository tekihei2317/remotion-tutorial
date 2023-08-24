import {Sequence} from 'remotion';
import {Audio} from 'remotion';
import {AbsoluteFill, Composition, Img, staticFile} from 'remotion';
import {loadFont} from '@remotion/google-fonts/NotoSansJP';
import {settings} from './contents/sisaku';
import {audioMetaMap} from './contents/sisaku-audio-meta';
import {
	createSectionFromSettings,
	getSectionTotalDuration,
	Section,
} from './core/contents';
import {useMemo} from 'react';

const sections = createSectionFromSettings(settings, audioMetaMap);

const {fontFamily} = loadFont();

const Jimaku = ({text}: {text: string}) => {
	return (
		<div
			style={{
				position: 'absolute',
				bottom: 0,
				width: '100%',
				zIndex: 1,
				fontSize: 60,
				height: 300,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'rgba(0, 0, 0, 0.4)',
				color: '#f8fafc', // Slate.50
				padding: 48,
				textAlign: 'center',
				fontFamily,
			}}
		>
			<span>{text}</span>
		</div>
	);
};

function createCumulativeSum(nums: number[], initialValue = 0): number[] {
	const sum = new Array(nums.length + 1);
	sum[0] = initialValue;
	nums.forEach((num, index) => {
		sum[index + 1] = sum[index] + num;
	});

	return sum;
}

const SectionSequences = ({
	from,
	section,
}: {
	from: number;
	section: Section;
}) => {
	const talkStartFroms = useMemo(
		() =>
			createCumulativeSum(
				section.talks.map((talk) => talk.duration),
				from + (section.sectionStart ? section.sectionStart.duration : 0)
			),
		[from, section]
	);

	return (
		<>
			{section.sectionStart && (
				<Sequence durationInFrames={section.sectionStart.duration} from={from}>
					<section.sectionStart.component />
				</Sequence>
			)}
			{section.talks.map((talk, index) => (
				<Sequence
					key={talk.audioId}
					from={talkStartFroms[index]}
					durationInFrames={talk.duration}
				>
					<AbsoluteFill>
						<Img src={staticFile('assets/background.png')} />
						<Img
							src={staticFile('assets/zunda0000.png')}
							style={{
								position: 'absolute',
								height: '800px',
								bottom: 0,
								right: 0,
							}}
						/>
						<Jimaku text={talk.text} />
						<Audio src={staticFile(`audio/${talk.audioId}.wav`)} />
					</AbsoluteFill>
				</Sequence>
			))}
		</>
	);
};

const sectionStartFrom = createCumulativeSum(
	sections.map((section) => getSectionTotalDuration(section))
);

const Sisaku = () => {
	return (
		<>
			<Audio src={staticFile('Pop_Drop.mp3')} volume={0.07} />
			<>
				{sections.map((section, index) => (
					<SectionSequences
						key={index}
						from={sectionStartFrom[index]}
						section={section}
					/>
				))}
			</>
		</>
	);
};

export const SisakuComposition = () => {
	const totalDuration = sections
		.map((section) => {
			return (
				(section.sectionStart?.duration ?? 0) +
				section.talks.reduce((sum, talk) => sum + talk.duration, 0)
			);
		})
		.reduce((sum, duration) => sum + duration, 0);

	return (
		<Composition
			id="Sisaku"
			component={Sisaku}
			durationInFrames={totalDuration}
			fps={30}
			width={1920}
			height={1080}
		/>
	);
};
