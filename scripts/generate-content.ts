import {talks} from '../src/contents/sisaku';
import {generateContent} from '../src/utils/talk';
import fs from 'node:fs/promises';
import path from 'node:path';

async function main() {
	// Sisaku.tsのデータを読み取って、必要な情報を追加し、_sisaku.tsに書き込む
	const contents = await generateContent(talks);
	await fs.writeFile(
		path.resolve(__dirname, '../src/contents/_sisaku.ts'),
		`export const talks = ${JSON.stringify(contents)}`
	);
}

main();
