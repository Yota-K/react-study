# ReactのCSS選定について
Reactは便利なライブラリですが、CSSを記述する方法がたくさんあって、どれを選べばいいかわからないという方が多いのではないでしょうか？   
ReactのCSSの主な記述方法としては以下のようなものが挙げられます。

* Pure CSS
* CSS Modules
* CSS in JS
* CSS Framework

今回はReactを使用するときに迷いがちな「ReactのCSS選定について」まとめてみました。   
この回では、CSSにフィチャーしたいので、話の趣旨が若干ずれてしまいそうなUIライブラリ（MUI・Chakra UIなど）に関してはあまり触れません。

## いきなり結論
あくまで個人の見解ですが、2022年5月時点だと、**CSS in JS**か**CSS FW**のどちらかがおすすめです。

## なぜPureCSSとCSS Modulesがおすすめできないのか
PureCSSとCSS Modulesは以下のような理由からおすすめはできません。

* PureCSSがおすすめできない理由
  * CSS設計（OOCSSやBEM、FLOCSSなど）を導入しないと複数人でCSSをいじった時に!importantだらけになる
  * CSSの有効範囲を絞れないので、ぱっと見で記述されているスタイルの影響範囲が分からない
  * SCSSを導入すれば、CSSの有効範囲は絞れるが、ネストが深いとコードを追うのが大変になる
* CSS Modulesがおすすめできない理由
  * CSSの有効範囲は絞れるが、将来的に[非推奨](https://github.com/webpack-contrib/css-loader/issues/1050)になる可能性がある

参考: https://zenn.dev/irico/articles/d0b2d8160d8e63

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

CSS in JSには以下のような特徴があります

* CSSの有効範囲を絞ることができる
* CSSのクラスはランダムなハッシュ値として出力されるので、クラス名を考える必要がない
* JSなのでpropsで動的にスタイルを変更したり、三項演算子を使って条件ごとにスタイルを切り替えたりできる

CSS in JSにはいくつかの種類があります。   
主要な物としては以下のライブラリが挙げられます。

* [styled-components](https://github.com/styled-components/styled-components)
* [emotion](https://github.com/emotion-js/emotion)
* [linaria](https://github.com/callstack/linaria)
* [vanilla-extract](https://github.com/seek-oss/vanilla-extract)

ここで紹介した物以外にもいくつかライブラリが存在しますが、大きく分けると「テンプレートリテラルスタイル」と「オブジェクトスタイル」の2種類に分けることができます。   
→ 正式名称ではなく、自分で勝手に命名しました。

**個人開発での導入事例**

[カルキチブログ](https://karukichi-blog.netlify.app/)

### テンプレートリテラルスタイル
jsのテンプレートリテラルでCSSを記述できるスタイルのことを指します。

### オブジェクトスタイル
jsのオブジェクトでCSSを記述できるスタイルのことを指します。

## CSS Framework

* メリット
  * 形になるまでが早いので、生産性が高い
  * クラス名考える必要ない
* デメリット
  * フレームワークの作法を覚える手間がかかる
  * CSSの微調整（paddingやrotateを1px単位で調整したいとか）が非常に面倒

個人の見解ですが、1px単位でスタイルを調整する必要があるケース（ウェブ制作や凝ったデザインのアプリケーション）では採用することはまずないです。

**個人開発での導入事例**

[カラパイアまとめ](https://karapaia-matome-front.vercel.app/)


## 使い分けについて
個人的には以下の使い分けがいいのかなと考えています。

* ウェブ制作
  * エンジニア以外（デザイナー）がCSSを記述する可能性がある場合・・・CSS in JS（テンプレートスタイル）
  * エンジニアしかスタイルを記述することがない場合・・・CSS in JS（オブジェクトスタイル）
* ウェブ開発
  * デザイナーがCSSを記述することがある場合・・・CSS in JS（テンプレートスタイル）
  * デザイナーが作成したデザインを再現する必要があるケース
    * シンプルなデザインの場合・・・CSS in JS（テンプレートスタイル、オブジェクトスタイル）、CSS FW
    * 複雑なデザインの場合・・・CSS in JS（テンプレートスタイル、オブジェクトスタイル）
  * デザイナーがいない場合・・・CSS Framework（本筋からは外れるが、そもそもデザイナーがいない場合はMUI・chakra UIなどUIコンポーネント生成する系のライブラリも候補に入る）
