# Reactのルーティングについて

Reactを使ったSPA（シングルアプリケーション）で一般的なウェブサイトやウェブアプリケーションで見られるルーティングを実装するためには、**React Router**と呼ばれるライブラリが必要になります。

## React Routerとは
[React Router](https://reactrouter.com/)とは、Reactを用いて作られたSPAでルーティングを行うためのライブラリです。   
ReactコンポーネントとURLを紐づけることで、アクセスされたURLに応じた画面を出し分けることができるようになります。

Reactを用いたSPA開発では必須になるライブラリです。

## React Routerの仕組みについて
React Routerを使用したルーティングは一般的なウェブサイト・ウェブアプリケーションのルーティングとは仕組みが違います。

### 一般的なウェブサイト・ウェブアプリケーションの場合
一般的なウェブサイト・ウェブアプリケーションの場合は、ブラウザ側で指定されたURLをもとにサーバにリクエストを送って、リクエストに応じたページを
サーバ側で返却することで、ルーティングを実現しています。

### React Routerの場合
React Routerを用いたルーティングの場合はサーバ側でリクエストに応じたページを返却する方法とは別の方法でルーティングを実現しています。

React Routerでは、**JavaScriptを使ってアクセスされたURLに応じた画面をレンダリングすることで、画面遷移を実現しています。**

ブラウザ上では画面遷移しているように見えますが、実際には画面が遷移しているわけではなく、アクセスしたURLに紐づくUIを出し分ける処理を行うことでサーバを使うことなくルーティングを実現しています。

## 【豆知識】SPAの表示速度はなんで速いの？
SPAを用いて構築されたウェブアプリケーションは高速と言われることが多いですが何故なのでしょうか？

ブラウザからリクエストが送られると、サーバは必要最小限のHTMLと、CSS・JSを返却するのですが、サーバから返却されたHTMLの中身は空に近い状態です。   

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <link rel="icon" href="/favicon.ico"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <meta name="theme-color" content="#000000"/>
    <meta name="description" content="Web site created using create-react-app"/>
    <link rel="apple-touch-icon" href="/logo192.png"/>
    <link rel="manifest" href="/manifest.json"/>
    <title>React App</title>
    <script defer="defer" src="/static/js/main.838e7659.js"></script>
    <link href="/static/css/main.6f302580.css" rel="stylesheet">
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

普通のウェブサイトやアプリケーションでは、ページが遷移するたびにサーバにアクセスしてHTMLやCSS、JSなどを取得する必要がありますが、SPAでは一度のリクエストで画面を生成するために必要な情報を全て取得します。

SPAではアクセス後に必要な画面の切り替えやデータの取得などをJavaScriptを使用して行うため、サーバへのリクエストを削減することができます。   
サーバへのリクエストを極限まで減らすことで、高速なページ遷移を実現できるため、SPAの表示速度は速いと言われています。

このような、ブラウザ上でJavaScriptを実行してDOMを生成して、コンテンツを表示させるレンダリング方式は CSR（Client Side Rendering）と呼ばれます。
