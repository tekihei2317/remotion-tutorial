import axios from 'axios';
import fs from 'node:fs/promises';

const voicevoxClient = axios.create({
	baseURL: 'http://127.0.0.1:50021',
});

export async function generateAudio(
	text: string,
	audioPath: string
): Promise<void> {
	const queryRes = await voicevoxClient.post(
		`/audio_query?speaker=1&text=${text}`
	);

	const synthesisRes = await voicevoxClient.post(
		'/synthesis?speaker=1',
		queryRes.data,
		{responseType: 'arraybuffer'}
	);

	await fs.writeFile(audioPath, synthesisRes.data);
}
