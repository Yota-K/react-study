# ReactのCSS選定について
ReactでCSSを記述する方法はたくさんあります。   
通常のCSSやSCSSなどのCSSメタ言語を利用する方法はもちろん、PureCSSと近い感覚で記述できて、スタイルの有効範囲を限定することができるCSS Modules、いっそCSSもJavaScriptで書いてしまおうという思想から誕生したCSS in JSなど、様々な選択肢があります。

今回はReactを使用するときに迷いがちな「ReactのCSS選定について」まとめてみました。   

**CSSにフィーチャーしたいので、話の趣旨が若干ずれてしまいそうなUIライブラリ（MUI・Chakra UIなど）に関してはあまり触れません。**

## 今日話すこと・重要なポイント
* ReactでCSSを記述する方法はstyleタグにCSSを記述することが一般的なVueや、RailsなどのMPAでフロントを構築する場合に比べて選択肢が多い
* それぞれの概要だけザックリ捉えておいて、技術選定する時の基準を作っておくことが重要！
* 概要すら知っていないと実務で開発を始めてから大変！

スタイルを記述してUIを構築するという目的は同じですが、それぞれ癖があるのでスタイルを記述する手法の特徴を知っておくことが重要です。

## いきなり結論
あくまで個人の見解ですが、2022年5月時点だと、**CSS in JS**か**CSS Framework**のどちらかがおすすめです。

## なぜPureCSSとCSS Modulesがおすすめできないのか
PureCSSとCSS Modulesは以下のような理由からおすすめはできません。

* PureCSSがおすすめできない理由
  * CSS設計（OOCSSやBEM、FLOCSSなど）を導入しないと複数人でCSSをいじった時に!importantだらけになる
  * CSSの有効範囲を絞れないので、ぱっと見で記述されているスタイルの影響範囲が分からない
  * SCSSを導入すれば、CSSの有効範囲は絞れるが、ネストが深いとコードを追うのが大変になる
* CSS Modulesがおすすめできない理由
  * CSSの有効範囲は絞れるが、将来的に[非推奨](https://github.com/webpack-contrib/css-loader/issues/1050)になる可能性がある

参考: https://zenn.dev/irico/articles/d0b2d8160d8e63

### CSS Modules
スタイルシートをReactコンポーネントで読み込んで、スタイルを記述する方法です。
```xxx.module.css```という拡張子のスタイルシートを用意して、React側のclassNameでスタイルを適用すると以下のようなクラスが生成されます。

```css
.Button_error_h1heu {
  color: white;
  background-color: red;
}
```

```ファイル名 + CSSのクラス名 + 一意な文字列```のクラス名を自動生成してくれるため、ピュアCSSとほぼ同じ使用感で、CSSの有効範囲を限定することができます。

**Button.module.css**

```css
.error {
  color: white;
  background-color: red;
}
```

```tsx
import React from 'react';
import styles from './Button.module.css'

/* classNameには、スタイルシートで定義したclass名を指定する */
const Button: React.FC = () => (
  <button className={styles.error}>
    Destroy
  </button>
)
```

サンプルコードはCSSですが、SCSSでも記述可能です。   
scssで記述する場合は、```xxx.module.scss```という拡張子になります。

## CSS in JS
CSSをJSで記述することができるというものです。   
以下のコードはstyed-componentsというライブラリを使用してスタイルを記述した例です。

```tsx
import React from 'react';
import styled from 'styled-components';

const Home: React.FC = () => {
  const Title = styled.h1`
    font-size: 26px;
    font-weight: bold;
    text-align: center;
  `;

  const Wrapper= styled.section`
    padding: 12px;
    background: blue;
  `;

  return (
    <Wrapper>
      <Title>
        Hello World!
      </Title>
    </Wrapper>
  );
}

export default Home;
```

### CSS in JSの特徴
CSS in JSには以下のような特徴があります

* CSSの有効範囲を絞ることができる
* CSSのクラスはランダムなハッシュ値として出力されるので、クラス名を考える必要がない
* JSなのでpropsで動的にスタイルを変更したり、三項演算子を使って条件ごとにスタイルを切り替えたりできる

### 主なCSS in JS
CSS in JSにはいくつかの種類があります。   
主要な物としては以下のライブラリが挙げられます。

* [styled-components](https://github.com/styled-components/styled-components)
* [emotion](https://github.com/emotion-js/emotion)
* [linaria](https://github.com/callstack/linaria)
* [vanilla-extract](https://github.com/seek-oss/vanilla-extract)

ここで紹介した物以外にもいくつかライブラリが存在しますが、大きく分けると「テンプレートリテラルスタイル」、「コンポーネントスタイル」、「オブジェクトスタイル」の3種類に分けることができます。   

### テンプレートリテラルスタイル
jsのテンプレートリテラルでCSSを記述できるスタイルのことを指します。   
PureCSSに近い感覚でCSSを記述できるので、柔軟にスタイルの記述を行いたい際はこちらがおすすめです。

**emotionの場合**

```ts
import { css, cx } from '@emotion/css'

const color = 'white'

render(
  <div
    className={css`
      padding: 32px;
      background-color: hotpink;
      font-size: 24px;
      border-radius: 4px;
      &:hover {
        color: ${color};
      }
    `}
  >
    Hover to change color.
  </div>
)
```

### コンポーネントスタイル
jsのテンプレートリテラルでCSSを記述できる点は「テンプレートリテラルスタイル」と同じだが、スタイルを適用したコンポーネントが生成される点が異なる。   

**styled-componentsの場合**

```ts
const Button = styled.a`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;

  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${props => props.primary && css`
    background: white;
    color: black;
  `}
`

render(
  <div>
    <Button
      href="https://github.com/styled-components/styled-components"
      target="_blank"
      rel="noopener"
      primary
    >
      GitHub
    </Button>

    <Button as={Link} href="/docs">
      Documentation
    </Button>
  </div>
)
```

propsで動的にスタイルを切り替えることができるので、CSSをシステマチックに書きたい場合はこちらの方法で記述するのが適しています。

### オブジェクトスタイル
jsのオブジェクトでCSSを記述できるスタイルのことを指します。   
TypeScriptを導入している場合はTSの補完が使えるので、JSを書くような感覚でスタイルの記述を行うことができます。

**emotionの場合**

```ts
import React from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";

const Header: React.FC = () => {
  const heading = css`
    a {
      color: #fff;
    }
  `;

  return (
    <header
      css={css({
        background: "#2196f3",
        color: "#fff",
        padding: "8px",
      })}
    >
      <h1 css={heading}>
        <Link to="/">React勉強会第4回</Link>
      </h1>
    </header>
  );
};

export default Header;
```

**vanilla-extractの場合**

```style.css.ts
import { style } from '@vanilla-extract/css';

export const hero = style({
  backgroundColor: 'red',
  color: '#fff',
  padding: '12px'
});
```

エンジニア目線だとJSのオブジェクトを書く感覚でCSSを書くことができるので書きやすと感じる人も多いかもしれませんが、デザイナーやコーダーからすると扱いづらい型式かもしれません。   
よって、エンジニアしかCSSを書くことがないケースに適していると考えられます。

## CSS Framework
CSS Frameworkとはフレームワークで定義されたクラスを適用するだけで、デザインを構築するができる枠組みのようなものです。   
うまく使いこなすことで、ボタンやフォーム、レイアウトなどを効率よく作成することができます。

### CSS Frameworkの特徴
CSS Frameworkには以下のような特徴があります。

* メリット
  * 形になるまでが早いので、生産性が高い
  * クラス名考える必要ない
* デメリット
  * フレームワークの作法を覚える手間がかかる
  * CSSの微調整（paddingやrotateを1px単位で調整したいとか）が非常に面倒

短期間でUIを構築しないといけない時には非常に役に立ちますが、1px単位でスタイルを調整するのは難しいため、ウェブ制作や凝ったデザインのアプリケーションでの採用はおすすめできません。

### 主なCSS Framework
CSS Frameworkにもいくつか種類がありますが、 最近は[Utility Class](https://tailwindcss.com/docs/adding-custom-styles#adding-component-classes)や[テーマの概念](https://tailwindcss.com/docs/theme)が存在する[Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)が採用されることが多いです。

## 使い分けについて
個人的には以下の使い分けがいいのかなと考えています。

* デザイナーがいる
  * デザイナーがCSSを記述することがある場合・・・CSS in JS（テンプレートスタイル）
  * デザイナーがCSSを記述することがない場合
    * シンプルなデザインの場合・・・CSS in JS（テンプレートスタイル、オブジェクトスタイル）、CSS FW
    * 複雑なデザインの場合・・・CSS in JS（テンプレートスタイル、オブジェクトスタイル）
* デザイナーがいない場合・・・CSS Framework（本筋からは外れるが、そもそもデザイナーがいない場合はMUI・chakra UIなどUIコンポーネント生成する系のライブラリも候補に入る）

## その他
個人開発での導入事例。

* [カルキチブログ（styled-components）](https://karukichi-blog.netlify.app/)
* [カラパイアまとめ（Tailwind CSS）](https://karapaia-matome-front.vercel.app/)

**MPA (Multi-page application)**

HTTPリクエストに応じて、サーバーサイドでHTMLを組み上げてブラウザに返却する従来の方式のアプリケーションのこと

**MPAとSSR(Serverside Rendering)の違い**

一度目の表示はサーバサイドでHTMLを生成するが、それ以降のUIの動きはJavaScriptフレームワーク（React・Vue）が行う点が異なる。   
SSRはフロントエンドの文脈のみで使用される。
