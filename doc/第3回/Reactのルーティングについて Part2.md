# React Routerの基本

## 基本的な使い方について
React Routerの導入方法は簡単です。

### ライブラリ本体のインストール
以下のコマンドをターミナル上で実行してライブラリ本体をインストールします。

**npm**
```sh
npm install react-router-dom@6
```

**yarn**
```sh
yarn add react-router-dom@6
```

## BrowserRouterでアプリケーション全体をラップする
```BrowserRouter```と呼ばれるReact Routerが提供している関数でアプリケーション全体をラップします。   
これでReact Routerを使う準備は完了です。

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

## React Routerでできること
React Routerでできることを簡単に紹介します。

### 一般的なルーティング
サンプルコードのように記述を行うと、以下のページにアクセスすることができるようになります。

* /
* /expenses
* /invoices

```tsx
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="expenses" element={<Expenses />} />
      <Route path="invoices" element={<Invoices />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
```

参考: https://reactrouter.com/docs/en/v6/getting-started/tutorial

### 動的なルーティング
パスパラメータを用いた動的なルーティングを行う場合は、React Routerから提供されている```useParams```というフックを使用して実装します。   
以下のサンプルコードはパスパラメータで受け取った数字を元にAPIリクエストを実行して、API経由で取得したデータをレンダリングする例です。

```tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const UserPage = () => {
  const params = useParams();

  const [mounted, setMouted] = useState(false);
  const [post, setPost] = useState<Post>({
    userId: 0,
    id: 0,
    title: "",
    body: "",
  });

  const getPosts = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${params.userId}`
    );
    const json: Post = await res.json();
    setPost(json);

    setMouted(true);
  };

  useEffect(() => {
    if (!mounted) getPosts();
  }, []);

  return (
    <div className="container">
      <h1>userId {params.userId}</h1>
      {!mounted ? (
        <div>Loading...</div>
      ) : (
        <div>
          <p>{post.id}</p>
          <p>{post.title}</p>
          <p>{post.body}</p>
        </div>
      )}
    </div>
  );
};

export default UserPage;
```

今回は基本的な使い方のみ紹介しましたが、React Routerには、リダイレクト処理やFirebase AuthenticationやAWS Cognitoなど認証・ユーザー管理を行う機能を提供するサービスを組み合わせることで、認証処理も実装できます。
