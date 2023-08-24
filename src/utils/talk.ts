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

async function getAudioDuration(talk: {text: string}): Promise<number> {
	return talk.text.length * 3;
}

export async function generateContent(
	talks: {text: string}[]
): Promise<TalkWithAudio[]> {
	console.log('[START] 音声を生成しています');
	const audioIdList = await Promise.all(
		talks.map((talk) => createAudio(talk.text))
	);
	console.log('[END] 音声を生成しました');

	const durations = await Promise.all(
		talks.map((talk) => getAudioDuration(talk))
	);

	return talks.map((talk, index) => ({
		text: talk.text,
		audioId: audioIdList[index],
		duration: durations[index],
	}));
}
