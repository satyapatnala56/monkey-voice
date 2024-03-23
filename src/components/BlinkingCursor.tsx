import classNames from "classnames";
import React, { useEffect, useState } from "react";

const BlinkingCursor = () => {
  const [showCursor, setShowCursor] = useState<Boolean>(true);

  useEffect(() => {
    const id = setInterval(() => setShowCursor((prev) => !prev), 600);
    return () => {
      clearInterval(id);
    };
  });

  return (
    <span
      className={classNames("text-unverified")}
      style={{
        opacity: showCursor ? 1 : 0.2,
        transition: "all 0.5s ease-out",
        fontSize: "1.5rem",
      }}
    >
      |
    </span>
  );
};

export default BlinkingCursor;
