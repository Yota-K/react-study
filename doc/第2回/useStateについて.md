# useStateについて
Reactで状態（State）管理を行うためのフックス。
Reactで一番よく使うフックス。

参考記事: https://ja.reactjs.org/docs/hooks-state.html

※ 状態のことはここから先Stateと呼ぶ。

## 使い方
state変数を宣言する際、2つの要素を含んだ配列が返却される

```ts
const [count, setCount] = useState(0);
```

### ポイント
* 1つ目の要素でStateを、2つ目の要素がStateを変更するための関数を設定できる
* 慣例的に変更用の関数はset〇〇と命名する
* state変数には好きな名前を命名することができる

## カウンターの例
以下のコードでは、```count```というState変数でStateを保持して、```setCount```という関数でcountの状態の変更を行っている。

```tsx
const UseStatePage: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h2>useStateについて</h2>
      <div>
        <h3>カウンターの例</h3>
        <button onClick={() => setCount(count + 1)}>countUp</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <p>{count}</p>
      </div>
    </div>
  );
};

export default UseStatePage;
```

## スプレッド構文でStateを変更する例
サンプルコードのように、スプレッド構文を用いて複数のStateの中から特定のStateのみを変更することも可能。

```ts
  // スプレッド構文でStateを変更する例
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = form;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
```

## useStateの主な用途
* 簡易的な状態の管理
  * input項目の入力状態の保持
  * アコーディオンの開閉状態
* 状態に応じた表示の出しわけ
  * APIからデータを取得できていない時は、「Loading...」と表示して、取得できたら、データを表示する
  * エラーメッセージの出しわけ

## その他
Vueで例えるなら、こんな感じ。

* 2系以前・・・data関数
* 3系・・・reactive, ref
