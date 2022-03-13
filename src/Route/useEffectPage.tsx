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
    // 100件だと多すぎるので、idが1〜10の投稿を取得
    const filterPosts = json.filter((e) => e.id <= 10);
    setPosts(filterPosts);

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
          ここまでの説明に使用した画面の中で既に使用している箇所があります...
        </p>
      </div>
    </div>
  );
};

export default UseEffectPage;
