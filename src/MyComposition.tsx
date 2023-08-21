import {Sequence, interpolate} from 'remotion';
import {spring, useVideoConfig} from 'remotion';
import {AbsoluteFill, Composition, useCurrentFrame} from 'remotion';

const Title = ({title}: {title: string}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 20], [0, 1], {
		extrapolateRight: 'clamp',
	});

	return <div style={{opacity, textAlign: 'center'}}>{title}</div>;
};

const MyComponent = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const scale = spring({
		fps,
		frame,
	});

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				fontSize: 100,
				backgroundColor: 'white',
			}}
		>
			<Sequence
				durationInFrames={40}
				style={{
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Title title="Hello" />
				<p> The current frame is {frame} </p>
				<p style={{transform: `scale(${scale})`}}>Hello, world!</p>
			</Sequence>
			<Sequence
				from={40}
				style={{
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Title title="World" />
				<p> The current frame is {frame} </p>
			</Sequence>
		</AbsoluteFill>
	);
};

export const MyComposition = () => {
	return (
		<Composition
			id="MyCompositio"
			durationInFrames={150}
			fps={30}
			width={1920}
			height={1080}
			component={MyComponent}
		/>
	);
};
