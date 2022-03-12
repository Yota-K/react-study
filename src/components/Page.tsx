import React, { useEffect } from "react";

type Props = {
  title: string;
  component: React.ReactNode;
};

const Page: React.FC<Props> = ({ title, component }) => {
  useEffect(() => {
    document.title = title || "";
  }, [title]);

  return <>{component}</>;
};

export default Page;
