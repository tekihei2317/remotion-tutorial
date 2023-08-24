import getAudioDurationInSeconds from 'get-audio-duration';
import crypto from 'node:crypto';
import path from 'node:path';
import {generateAudio} from './voicevox';

export const AUDIO_DIR = path.resolve(__dirname, '../../public/audio');

async function createAudio(text: string): Promise<string> {
	const id = crypto.randomUUID();
	console.log(`[START] "${text}"の音声を生成しています`);
	await generateAudio(text, path.join(AUDIO_DIR, `${id}.wav`));
	console.log(`[END] "${text}"の音声を生成しました`);

	return id;
}

type TalkWithAudio = {
	text: string;
	duration: number;
	audioId: string;
};

const FPS = 30;

async function getAudioDuration(audioPath: string): Promise<number> {
	const seconds = await getAudioDurationInSeconds(audioPath);
	return Math.floor(seconds * FPS);
}

export async function generateContent(
	talks: {text: string}[]
): Promise<TalkWithAudio[]> {
	console.log('[START] 音声を生成しています');
	const audioIdList = await Promise.all(
		talks.map((talk) => createAudio(talk.text))
	);
	console.log('[END] 音声を生成しました');
	// Const audioIdList: string[] = [];
	// for (const talk of talks) {
	// 	audioIdList.push(await createAudio(talk.text));
	// }

	const durations = await Promise.all(
		audioIdList.map((audioId) =>
			getAudioDuration(`${AUDIO_DIR}/${audioId}.wav`)
		)
	);

	return talks.map((talk, index) => ({
		text: talk.text,
		audioId: audioIdList[index],
		duration: durations[index],
	}));
}
