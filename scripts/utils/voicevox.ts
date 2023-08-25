import axios from 'axios';
import fs from 'node:fs/promises';

export const voicevoxClient = axios.create({
	baseURL: 'http://127.0.0.1:50021',
});

async function fileExists(path: string): Promise<boolean> {
	try {
		await fs.stat(path);
		return true;
	} catch {
		return false;
	}
}

export async function generateAudio(
	text: string,
	audioPath: string
): Promise<void> {
	if (await fileExists(audioPath)) {
		return;
	}

	const queryRes = await voicevoxClient.post(
		`/audio_query_from_preset?text=${text}&preset_id=2`
	);

	const synthesisRes = await voicevoxClient.post(
		'/synthesis?speaker=1',
		queryRes.data,
		{responseType: 'arraybuffer'}
	);

	await fs.writeFile(audioPath, synthesisRes.data);
}
