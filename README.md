# remotion-tutorial

remotionのGetting Startedをやってみる。

## 基本

コンポーネントでは、フレームに合わせて表示を変更する。フレームは`useCurrentFrame`で取得できる。

Remotionに動画を登録するには、Compositionコンポーネントを使う。Compositionコンポーネントは、動画のメタデータ（fps、全体フレーム数、width、height）とコンポーネントの組み合わせ。Composition Componentをルートでレンダリングすると、Web UIから動画のプレビューを見れる。すごいね。

`useCurrentFrame`以外でアニメーションを作った場合（CSSアニメーションなど）、ちらつくことがあるみたい。

動画をレンダリングするには、Web UIでShift + Rを押せばダイアログが出てくる。動画時間以上の時間がかかりそうな雰囲気はある。

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm start
```

**Render video**

```console
npm run build
```

**Upgrade Remotion**

```console
npm run upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).
![Alt text](image.png)