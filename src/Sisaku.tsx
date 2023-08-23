// 試作する
// やりたいこと
// - 背景の表示
// - 立ち絵の表示
// - 字幕の表示
// - BGMの再生

import {Series} from 'remotion';
import {Audio} from 'remotion';
import {AbsoluteFill, Composition, Img, staticFile} from 'remotion';

type Talk = {text: string; duration: number};

const texts = [
	'どうも、ずんだもんなのだ',
	'今日はTOPSIC SQL CONTESTの問題を解いてみるのだ',
	'TOPSIC SQL CONTESTは、その名前の通りSQLのコンテストなのだ',
	'60分の制限時間の間にSQLの問題を解いて、点数や解答時間の速さを競うのだ',
	'TOPSIC SQL CONTESTは、最近は2ヶ月に一回くらいの頻度で開催されているのだ',
	'直近の開催は第8回で、2023/08/18~2023/08/21に開催されていたのだ',
	'挑戦期間は3日間あるので、\n好きな日時に参加できるのが素晴らしいのだ',
	'では早速、第8回TOPSIC SQL CONTESTの問題を解いてみるのだ',
];

function createTalks(texts: string[]): Talk[] {
	return texts.map((text) => {
		const duration = text.length * 3;
		return {
			text,
			duration,
		};
	});
}

const talks = createTalks(texts);

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
			}}
		>
			<span>{text}</span>
		</div>
	);
};

const Sisaku = () => {
	return (
		<>
			<Audio src={staticFile('Pop_Drop.mp3')} volume={0.3} />
			<Series>
				{talks.map((talk) => (
					<Series.Sequence durationInFrames={talk.duration}>
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
						</AbsoluteFill>
					</Series.Sequence>
				))}
			</Series>
		</>
	);
};

export const SisakuComposition = () => {
	const totalDuration = talks.reduce((sum, talk) => sum + talk.duration, 0);

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
