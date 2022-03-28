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
