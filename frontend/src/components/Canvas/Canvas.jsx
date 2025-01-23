import React from "react";

function Canvas({ ...delegated }, ref) {
  return (
    <canvas
      ref={ref}
      width="600"
      height="300"
      style={{ border: "1px solid black" }}
      {...delegated}
    />
  );
}

export default React.forwardRef(Canvas);
