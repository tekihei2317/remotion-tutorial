import {voicevoxClient} from '../src/utils/voicevox';

type Preset = {
	id: number;
	name: string;
	speaker_uuid: string;
	style_id: number;
	speedScale: number;
	pitchScale: number;
	intonationScale: number;
	volumeScale: number;
	prePhonemeLength: number;
	postPhonemeLength: number;
};

const defaultPreset: Preset = {
	id: -1,
	name: '',
	// eslint-disable-next-line camelcase
	speaker_uuid: '7ffcb7ce-00ec-4bdc-82cd-45a8889e43ff',
	// eslint-disable-next-line camelcase
	style_id: 0,
	speedScale: 1,
	pitchScale: 0,
	intonationScale: 1,
	volumeScale: 1,
	prePhonemeLength: 0.1,
	postPhonemeLength: 0.1,
};

async function main() {
	const presetsRes = await voicevoxClient.get('/presets');

	// 初期データ（ID=1）以外を削除する
	for (const preset of presetsRes.data.filter(
		(preset: {id: number}) => preset.id !== 1
	)) {
		await voicevoxClient.post(`/delete_preset?id=${preset.id}`);
	}

	// 解説用のプリセットを登録する
	const presetRes = await voicevoxClient.post('/add_preset', {
		...defaultPreset,
		id: 2,
		name: '解説用',
		speedScale: 1.3,
		volumeScale: 1.5,
	});
	console.log(`ID = ${presetRes.data}のプリセットを登録しました`);
}

main();
