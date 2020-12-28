import React from "react";
import CustomRenderer from "./renderer";

const Text = (props) => {
  return <p className={props.className}>{props.content}</p>;
};

const App = () => {
  return (
    <div>
      <Text className="hello-class" content="Hello" />
      <span style={{ color: "blue" }}>World</span>
    </div>
  );
};

CustomRenderer.render(<App />, document.getElementById("root"));
