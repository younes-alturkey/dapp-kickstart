import React from "react";

export default ({ children }) => {
  return (
    <div>
      <h1>I'm a header</h1>
      {children}
      <h1>I'm a footer</h1>
    </div>
  );
};
