# useEffectについて
副作用を有する可能性のある命令型のコードを受け付けるフックス。   
雑に解釈すると、画面が表示された後に、処理を実行するためのフックス。

参考記事: https://ja.reactjs.org/docs/hooks-reference.html#useeffect

## 使い方
第1引数には実行させたい関数を、第2引数には第1引数に渡した関数の実行タイミングを制御する依存データを記述する。

```ts
useEffect(() => {
  console.log('rendering!')
}, [依存する値を配列内に指定する]) 
```

### ポイント
* useEffect内に記述した処理はコンポーネントがレンダリングされた後に処理が実行される
* 第2引数の配列を空の状態にすると初回レンダリング時のみ処理を実行することができる

## APIをコールしてデータをレンダリングする例
以下のコードではAPIからデータを取得してレンダリングを行っている。   
useStateと組み合わせると、データの取得するまでローディング画面を表示して、取得が完了したら表示することもできる。

```tsx
import React, { useState, useEffect } from "react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const UseEffectPage: React.FC = () => {
  const [mounted, setMouted] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const getPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const json: Post[] = await res.json();
    setPosts(json);

    setMouted(true);
  };

  useEffect(() => {
    if (!mounted) getPosts();
  }, []);

  return (
    <div className="container">
      <h2>useEffectについて</h2>
      <div>
        <h3>APIをコールしてデータをレンダリングする例</h3>
        {!mounted ? (
          <div>Loading...</div>
        ) : (
          <>
            {posts.map((e) => (
              <div key={e.id}>
                <p>{e.id}</p>
                <p>{e.title}</p>
                <p>{e.body}</p>
              </div>
            ))}
          </>
        )}
      </div>
      <div>
        <h3>第2引数に渡した値が変化した時に処理を実行する例</h3>
        <p>
          ここまでの説明に使用した画面の中で既にに使用している箇所があります...
        </p>
      </div>
    </div>
  );
};

export default UseEffectPage;
```

## 第2引数に渡した値が変化した時に処理を実行する例
以下のサンプルコードでは、propsでtitleに設定したい文字列を受け取った時に、```document.title```でtitleタグを変更している。

```tsx
import React, { useEffect } from "react";

type Props = {
  title: string;
  component: React.ReactNode;
};

const Page: React.FC<Props> = ({ title, component }) => {
  useEffect(() => {
    document.title = title || "";
  }, [title]);

  return <>{component}</>;
};

export default Page;
```

## その他できること
アンマウント時に処理を実行したい時には、戻り値として関数を返却する。

```ts
useEffect(() => {
  return () => {
    // この関数はコンポーネントが UI から削除される前に呼び出される
  };
});
```

使い道としては、スクロール位置に応じて要素にクラスを付け替えたり、グローバルステートに保持している値を初期化したりする時に使用することが多い。

### 一定位置までスクロールしたら、特定の要素にクラスを付与するサンプルコード
```ts
  const handleScroll = () => {
    const scrollBtn = document.querySelector('.scroll-top');
    const height = window.innerHeight;
    const offset = window.pageYOffset;

    if (offset - height > height) {
      scrollBtn?.classList.add('slide-top');
    } else {
      scrollBtn?.classList.remove('slide-top');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);

      // コンポーネントが消えたときに監視を停止する
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
```

## useEffectの主な用途
* バックエンドから取得したデータを表示する
* DOMの書き換え
  * 画面遷移に合わせてtitleを変更する
  * iframeを表示する
  * 画面のレンダリング後にDOM操作を行う
* アンマウント時にグローバスステートに保持している値を初期化する

画面のレンダリング後にDOM操作を行う処理を乱用すると、**UIを宣言的に構築できるReactの良さを消してしまうので、最低限に留めた方がいい。**   
DOM操作がどうしても必要な時も、```getElementById```や```querySelector```などを使用する前に```useRef```を使ってなんとかできないか考えるのがおすすめです。

useRefについて: https://ja.reactjs.org/docs/hooks-reference.html

## その他
Vueで例えるなら、こんな感じ。

* 2系以前（Options API）
  * 第2引数に空の配列を渡す・・・mounted
  * 第2引数に監視したい要素を渡す・・・watch
  * アンマウント時に処理を実行したい時・・・destroyed
* 3系（Composition API）
  * 第2引数に空の配列を渡す・・・onMounted
  * 第2引数に監視したい要素を渡す・・・watch, watchEffect
  * アンマウント時に処理を実行したい時・・・onUnmounted

第2引数に監視したい要素を渡すとVueでいうwatchやwatchEffectのような挙動を実現できるが、useEffectは初回レンダリング時に**最低1度は処理が発火するため、厳密には微妙に違う。**
