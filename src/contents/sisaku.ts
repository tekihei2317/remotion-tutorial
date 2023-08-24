const texts = [
	'どうも、ずんだもんなのだ',
	'今日はTOPSIC SQL CONTESTの問題を解いてみるのだ',
	'TOPSIC SQL CONTESTは、その名前の通りSQLのコンテストなのだ',
	'60分の制限時間の間にSQLの問題を解いて、点数や解答時間の速さを競うのだ',
	'TOPSIC SQL CONTESTは、最近は2ヶ月に一回くらいの頻度で開催されているのだ',
	'直近の開催は第8回で、2023年8月18日から8月21日の間に開催されていたのだ',
	'挑戦期間は3日間あるので、好きな日時に参加できるのが素晴らしいのだ',
	'では早速、第8回の問題を解いてみるのだ',
];

type Talk = {text: string; duration: number};

export const talks: Talk[] = texts.map((text) => ({
	text,
	duration: text.length * 3,
}));
