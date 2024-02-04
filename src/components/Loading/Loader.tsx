import React from "react";
import "./Loader.scss";
function Loader() {
  return (
    <div className="text-center">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
