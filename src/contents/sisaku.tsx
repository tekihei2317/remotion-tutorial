import {AbsoluteFill} from 'remotion';
import {VideoSettings} from '../core/contents';

const slate900 = '#0f172a';

export const settings: VideoSettings = [
	{
		talks: [
			{
				text: 'こんにちは',
			},
			{
				text: '今日はTOPSIC SQL CONTESTの問題を解いてみます',
				image: {src: 'sisaku/topsic-sql-contest.png'},
			},
			{
				text: 'TOPSIC SQL CONTESTは、その名前の通りSQLのコンテストです',
				image: {src: 'sisaku/topsic-sql-contest.png'},
			},
			{
				text: '60分の制限時間の間にSQLの問題を解いて、点数や解答時間の速さを競います',
			},
			{
				text: 'TOPSIC SQL CONTESTは、最近は2ヶ月に一回くらいの頻度で開催されています',
				image: {src: 'sisaku/topsic-past-contests.png'},
			},
			{
				text: '直近では、第8回コンテストが2023年8月18日から3日間開催されました',
				image: {src: 'sisaku/topsic-past-contests.png'},
			},
			{
				text: '開催期間中であれば好きな時間に始められるので、参加しやすいです',
			},
			{
				text: 'では早速、第8回の問題を解いてみましょう',
			},
		],
	},
	{
		sectionStart: {
			component: () => (
				<AbsoluteFill style={{backgroundColor: slate900}}>
					<p style={{textAlign: 'center', fontSize: 70, color: 'white'}}>
						問題1
					</p>
					<p style={{textAlign: 'center', fontSize: 100, color: 'white'}}>
						点数差分
					</p>
				</AbsoluteFill>
			),
			duration: 75,
		},
		talks: [
			{
				text: 'まずは問題文を確認しましょう',
			},
			{
				text: 'あるコンテストの結果を保持している、コンテスト結果テーブルより、点数1回目と点数2回目の差分が20点以上ある会員を表示しなさい',
				image: {src: 'sisaku/p1-sample-input.png'},
			},
			{
				text: '一問目なので簡単ですね',
				image: {src: 'sisaku/p1-sample-input.png'},
			},
			{
				text: '表示フォーマットというところには、サンプルデータに対する答えが書かれています',
				image: {src: 'sisaku/p1-sample-output.png'},
			},
			{
				text: '差が20のものと-20のものが表示されています',
				image: {src: 'sisaku/p1-sample-output.png'},
			},
			{
				text: 'つまり、フィルタリングは絶対値で行い、表示は絶対値をとらずに表示すればよさそうです',
				image: {src: 'sisaku/p1-sample-output.png'},
			},
			{
				text: '問題が理解できたので、SQLを書いていきます',
			},
			{
				text: '問題ページにコードエディタがあるので、それを使います',
				image: {src: 'sisaku/p1-codetest.png'},
			},
			{
				text: 'コードテストを実行して動作確認もできます',
				image: {src: 'sisaku/p1-codetest.png'},
			},
			{
				text: 'ここでは、SQLは基本的に小文字で書いています',
				image: {src: 'sisaku/p1-answer1.png'},
			},
			{
				text: '列名は表示フォーマットと同じ必要があるため、列のエイリアスは大文字で書いています',
				image: {src: 'sisaku/p1-answer1.png'},
			},
			{
				image: {src: 'sisaku/p1-answer1.png'},
				text: 'SQLが書けたらコードテストを実行して、結果を確認してみましょう',
			},
			{
				text: '表示内容は合っていそうですね。最後に、表示順に合わせて並び替えます。',
				image: {src: 'sisaku/p1-answer1-output.png'},
			},
			{
				text: '表示順は、差分の降順、IDの降順です',
			},
			{
				text: '次のように、並べ替えの条件を追加しました',
				image: {src: 'sisaku/p1-answer2.png'},
			},
			{
				text: '回答を作成できたので、提出します',
				image: {src: 'sisaku/p1-answer2.png'},
			},
			{
				text: '提出すると、正解をもらうことができました  やったー',
				image: {src: 'sisaku/p1-submission.png'},
			},
		],
	},
	{
		sectionStart: {
			component: () => (
				<AbsoluteFill style={{backgroundColor: slate900}}>
					<p style={{textAlign: 'center', fontSize: 70, color: 'white'}}>
						問題2
					</p>
					<p style={{textAlign: 'center', fontSize: 100, color: 'white'}}>
						受注件数
					</p>
				</AbsoluteFill>
			),
			duration: 75,
		},
		talks: [
			{
				text: '次の問題に進みます',
			},
			{
				text: '受注テーブルより、受注日が、2023年7月1日から2023年7月31日の1ヵ月間で受注した顧客毎の受注件数を表示しなさい。ただし、同一日の受注は1件とカウントする。',
				image: {src: 'sisaku/p2-er.png'},
			},
			{
				text: 'サンプル出力はこちらです',
				image: {src: 'sisaku/p2-sample-output.png'},
			},
			{
				text: '同一日の受注を一件とカウントするという条件がなければ、受注テーブルと顧客テーブルをJOINして、顧客コードで集約すれば解けます',
				image: {src: 'sisaku/p2-sample-output.png'},
			},
			{
				text: 'なので、まずは同一日の受注をまとめることから始めましょう',
			},
			{
				text: '同一日の受注をまとめるには、SELECT DISTINCTで重複を除外するのが簡単です',
				image: {src: 'sisaku/p2-select-distinct.png'},
			},
			{
				text: 'あとは、このテーブルと顧客テーブルをJOINして、件数と名前を取得すれば完成です。',
				image: {src: 'sisaku/p2-answer.png'},
			},
		],
	},
];
