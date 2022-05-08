import React from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";

const Header: React.FC = () => {
  const heading = css`
    a {
      color: #fff;
    }
  `;

  return (
    <header
      css={css({
        background: "#2196f3",
        color: "#fff",
        padding: "8px",
      })}
    >
      <h1 css={heading}>
        <Link to="/">React勉強会第4回</Link>
      </h1>
    </header>
  );
};

export default Header;
