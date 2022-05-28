import React from "react";
import ReactDOM from "react-dom";

const PortalSample: React.FC = () => {
  // ! は、オペランドが非nullかつ非undefinedであることを明示する
  const portalDiv = document.getElementById("portal")!;
  return ReactDOM.createPortal(<div>test</div>, portalDiv);
};

export default PortalSample;
