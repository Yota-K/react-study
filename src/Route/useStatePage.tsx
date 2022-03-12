import React, { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const UseStatePage: React.FC = () => {
  // カウンターの例
  const [count, setCount] = useState(0);

  // スプレッド構文でStateを変更する例
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });
  const {name, email, password } = form;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
 
  return (
    <div className="container">
      <h1>useStateについて</h1>
      <div>
        <h2>カウンターの例</h2>
        <button onClick={() => setCount(count + 1)}>countUp</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <p>{count}</p>
      </div>
      <div>
        <h2>スプレッド構文でStateを変更する例</h2>
        <form>
          <fieldset>
            <label htmlFor="name">名前</label>
            <input id="name" name="name" type="text" onChange={handleChange} />
          </fieldset> 
          <fieldset>
            <label htmlFor="email">メールアドレス</label>
            <input id="email" name="email" type="email" onChange={handleChange} />
          </fieldset>
          <fieldset>
            <label htmlFor="password">パスワード</label>
            <input id="password" name="password" type="password" onChange={handleChange} />
          </fieldset>
        </form>
        <div>
          <p>name: {name}</p>
          <p>email: {email}</p>
          <p>password: {password}</p>
        </div>
      </div>
    </div>
  );
};

export default UseStatePage;