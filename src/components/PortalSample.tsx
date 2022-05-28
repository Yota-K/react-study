import React from "react";
import ReactDOM from "react-dom";

type Props = {
  children: React.ReactNode;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const PortalSample: React.FC<Props> = ({ children, setShow }) => {
  // ! は、オペランドが非nullかつ非undefinedであることを明示する
  const portalDiv = document.getElementById("portal")!;
  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div style={{ width: "50%", padding: "1em", backgroundColor: "white" }}>
        <div>{children}</div>
        <div>
          <button onClick={() => setShow(false)}>Close</button>
        </div>
      </div>
    </div>,
    portalDiv
  );
};

export default PortalSample;
