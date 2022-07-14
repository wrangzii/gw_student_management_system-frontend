import React from "react";

function Bio({ content }) {
  return (
    <div className="bio">
      <div className="container">
        <p>{content}</p>
      </div>
    </div>
  );
}

export default Bio;
