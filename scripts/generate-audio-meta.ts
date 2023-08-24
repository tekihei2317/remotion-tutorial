import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import getAudioDurationInSeconds from 'get-audio-duration';
import {generateAudio} from './utils/voicevox';
import {settings} from '../src/contents/sisaku';
import {AudioMeta, AudioMetaMap, VideoSettings} from '../src/core/contents';

export const AUDIO_DIR = path.resolve(__dirname, '../public/audio');

async function createAudio(text: string): Promise<string> {
	const id = crypto.randomUUID();
	console.log(`[START] "${text}"の音声を生成しています`);
	await generateAudio(text, path.join(AUDIO_DIR, `${id}.wav`));
	console.log(`[END] "${text}"の音声を生成しました`);

	return id;
}

async function getAudioDuration(audioPath: string): Promise<number> {
	const FPS = 30;
	const seconds = await getAudioDurationInSeconds(audioPath);
	return Math.floor(seconds * FPS);
}

export async function generateAudioMeta(
	settings: VideoSettings
): Promise<AudioMetaMap> {
	const audioMeta: AudioMetaMap = [];

	for (const section of settings) {
		console.log('[START] 音声を生成しています');
		const audioIdList = await Promise.all(
			section.talks.map((talk) => createAudio(talk.text))
		);
		console.log('[END] 音声を生成しました');

		const durations = await Promise.all(
			audioIdList.map((audioId) => {
				// Return 30;
				return getAudioDuration(`${AUDIO_DIR}/${audioId}.wav`);
			})
		);

		const talkAudioList: AudioMeta[] = section.talks.map((_, index) => ({
			audioId: audioIdList[index],
			duration: durations[index],
		}));
		audioMeta.push(talkAudioList);
	}

	return audioMeta;
}

async function main() {
	// Sisaku.tsのデータを読み取って、必要な情報を追加し、_sisaku.tsに書き込む
	const audioMetaMap = await generateAudioMeta(settings);

	await fs.writeFile(
		path.resolve(__dirname, '../src/contents/sisaku-audio-meta.ts'),
		`import { AudioMetaMap } from '../core/contents'

export const audioMetaMap: AudioMetaMap = ${JSON.stringify(
			audioMetaMap,
			null,
			2
		)}`
	);
}

main();
