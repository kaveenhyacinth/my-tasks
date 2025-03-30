import React from "react";

type TabContainerProps = {
  children: React.ReactNode;
};

const TabContainer = ({ children }: TabContainerProps) => {
  return <div className="pt-3 md:pt-5">{children}</div>;
};

export default React.memo(TabContainer);
