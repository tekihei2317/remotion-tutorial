import {talks} from '../src/contents/sisaku';
import {generateContent} from '../src/utils/talk';
import fs from 'node:fs/promises';
import path from 'node:path';

async function main() {
	// _sisakuから中身を読み取る
	// 生成する
	// sisaku.tsxに書き込む
	const contents = await generateContent(talks);
	await fs.writeFile(
		path.resolve(__dirname, '../src/contents/_sisaku.ts'),
		`export const talks = ${JSON.stringify(contents)}`
	);
}

main();
