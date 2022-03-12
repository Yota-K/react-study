import React, { useState } from "react";

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

  return (
    <div className="container">
      <h2>useStateについて</h2>
      <div>
        <h3>カウンターの例</h3>
        <button onClick={() => setCount(count + 1)}>countUp</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <p>{count}</p>
      </div>
      <div>
        <h3>スプレッド構文でStateを変更する例</h3>
        <form>
          <fieldset>
            <label htmlFor="name">名前</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="off"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="off"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="off"
              onChange={handleChange}
            />
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
