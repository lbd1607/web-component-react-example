import React from "react";

const PlayerElement = ({ height, width }) => {
  return (
    <div style={{ border: "gray dashed 1px", width: width, height: height }}>
      <video src={"/portfolio-demo.mp4"} datatype="mp4" />
    </div>
  );
};

export default PlayerElement;
