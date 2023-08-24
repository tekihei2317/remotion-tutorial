import axios from 'axios';
import fs from 'node:fs/promises';

export const voicevoxClient = axios.create({
	baseURL: 'http://127.0.0.1:50021',
});

export async function generateAudio(
	text: string,
	audioPath: string
): Promise<void> {
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
