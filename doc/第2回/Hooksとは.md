# Hooksとは

従来classコンポーネントでしか使用できなかったstate等の機能をfunctionalコンポーネント(関数コンポーネント)でも使用可能にする機能です。

引用: https://qiita.com/k-penguin-sato/items/b27e3936f8d383a4dbc7

## Classコンポーネントでの記述法
```tsx
import React from "react";

class CountComponent extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     count: 0
   };
 }

 render() {
   return (
     <div>
       <p>count: {this.state.count} times</p>
       <button onClick={() => this.setState({ count: this.state.count + 1 })}>
         Click
       </button>
     </div>
   );
 }
```

## 関数コンポーネントでの記述法
```tsx
import React, { useState } from "react";

const CountComponent: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>count: {count} times</p>
      <button onClick={() => setCount(count + 1 )}>
        Click
      </button>
    </div>
  )
}
```
