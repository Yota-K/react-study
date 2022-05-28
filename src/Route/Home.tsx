import React, { useState } from "react";
import PortalSample from "../components/PortalSample";
import Nav from "../components/Nav";

const Home: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="container">
      <h2>もくじ</h2>
      <Nav />
      {show && (
        <PortalSample setShow={setShow}>モーダルのテキスト</PortalSample>
      )}
      <div>
        <button onClick={() => setShow(!show)}>モーダルを表示する</button>
      </div>
    </div>
  );
};

export default Home;
