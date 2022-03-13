# useContext・useReducerについて
コンポーネントを跨いだ状態管理を行うときに使用するフックス。
グローバルステートの管理をしたい時に使用することが多い。

※ コンポーネントの中だけで状態管理が完結しているので、厳密にはグローバルステートではない。

https://ics.media/entry/200409/

## useContextとは
Reactの機能の一つであるContext（階層ごとにプロパティを渡すことなく、コンポーネントツリー内でデータを渡す方法のこと）の機能を提供するフックス。
Contextを生成する```createContext```とセットで使用することが多い。

参考記事: https://ja.reactjs.org/docs/hooks-reference.html#usecontext

### 使い方
```tsx
// valueでContextで管理している値を取得できる
const value = useContext(MyContext);
```

### 公式ドキュメントに掲載されているサンプルコード
```tsx
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

引用: https://ja.reactjs.org/docs/hooks-reference.html#usecontext

## useReducerとは
useStateと同じく、Reactで状態管理を行うためのフックス。
値の管理だけではなく、ロジックも記述することができるので、useStateよりも複雑な状態管理を行いたい時に適している。
useStateよりも複雑な状態を管理するときに使用する。

参考記事: https://ja.reactjs.org/docs/hooks-reference.html#usereducer

### 使い方
Stateを書き換えるためのreducer関数と初期値を引数に渡すと、現在のstateとdispatch関数（Stateを変更するために必要な関数）の両方を返却する。

```ts
const [state, dispatch] = useReducer(reducer,'初期値')
```

### TODOの状態管理と状態の変更を行うサンプル
```ts
type Todo = {
  id: number;
  body: string;
  done: boolean;
};

export type State = {
  text: string;
  todos: Todo[];
};

export const initialState: State = {
  text: "",
  todos: [],
};

export type Action =
  | { type: "change"; text: string }
  | { type: "add" }
  | { type: "toggleTodo"; id: number };

export const reducer = (state: State, action: Action): State => {
  if (action.type === "change") {
    return {
      ...state,
      text: action.text,
    };
  } else if (action.type === "add") {
    return {
      ...state,
      text: "",
      todos: [
        ...state.todos,
        {
          id: state.todos.length + 1,
          body: state.text,
          done: false,
        },
      ],
    };
  } else if (action.type === "toggleTodo") {
    // Stateを直接書き換えることはできないので、Stateのディープコピーを作る
    const copyTodos = state.todos.map((todo) => ({ ...todo }));

    const newTodos = copyTodos.map((todo) => {
      if (todo.id === action.id) {
        todo.done = !todo.done;
      }
      return todo;
    });
    console.log(newTodos);

    return {
      ...state,
      todos: newTodos,
    };
  } else {
    return state;
  }
};
```

## useStateとuseReducerの違い
以下のような違いがある。

| useState  | useReducer |
| --- | --- |
| 扱えるStateの種類 | 文字列、数値、配列、オブジェクト、ブーリアン | 配列かオブジェクト |
| ローカル or グローバル | ローカル | グローバル |

## useContext・useReducerの主な用途
* コンポーネントを跨いだ状態を管理するとき
  * ログイン状態
  * ユーザー情報を編集した時に、サイドバーやヘッダーのユーザー名を更新する
  * ページネーションの状態やメニューの開閉状態を別ページに遷移しても保持する
* propsのバケツリレーをせずに状態を管理したい時

## その他
Vueで例えるなら、こんな感じ。

* 2系以前（Options API）
  * 別途ライブラリを導入しないと実現できない
* 3系（Composition API）
  * provide・inject

2系以前では、Vueでコンポーネントを跨いだ状態管理を行うには、Vuexを使うしか方法はなかった。
