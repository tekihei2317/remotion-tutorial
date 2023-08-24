/**
 * 発言（設定ファイル）
 */
export type RawTalk = {
	text: string;
	image?: {src: string};
};

/**
 * セクション（設定ファイル）
 */
export type RawSection = {
	sectionStart?: {component: () => JSX.Element; duration: number};
	talks: RawTalk[];
};

export type VideoSettings = RawSection[];

/**
 * 発言
 */
export type Talk = {
	text: string;
	image?: {src: string};
	audioId: string;
	duration: number;
};

/**
 * セクション
 */
export type Section = {
	sectionStart?: {component: () => JSX.Element; duration: number};
	talks: Talk[];
};

export type AudioMeta = {
	audioId: string;
	duration: number;
};

/**
 * セクション番号とトーク番号から、音声のメタ情報を取得する
 */
export type AudioMetaMap = AudioMeta[][];

/**
 * 設定ファイルから、セクションの情報を作成する
 */
export function createSectionFromSettings(
	sections: RawSection[],
	audioMetaMap: AudioMetaMap
): Section[] {
	return sections.map((section, sectionIndex) => {
		const talks: Talk[] = section.talks.map((talk, talkIndex) => ({
			...talk,
			...audioMetaMap[sectionIndex][talkIndex],
		}));

		return {...section, talks};
	});
}

export function getSectionTotalDuration(section: Section): number {
	return (
		(section.sectionStart?.duration ?? 0) +
		section.talks
			.map((talk) => talk.duration)
			.reduce((sum, duration) => sum + duration, 0)
	);
}
