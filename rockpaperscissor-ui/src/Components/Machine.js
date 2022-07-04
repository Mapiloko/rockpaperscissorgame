import React from "react";

function Machine({ aSelection, bSelection }) {
  return (
    <div className="container">
      <div className="row" style={{ marginTop: "50px" }}>
        <div className=" col-6 text-secondary left">
          <h2 className="users">User A-Machine</h2>
          <div className="selected" style={{ marginTop: "150px" }}>
            <p className=" h2 my-auto">Selected By User A:</p>
            {aSelection === "rock" ? (
              <div className="selected-rock"></div>
            ) : aSelection === "paper" ? (
              <div className="selected-paper"></div>
            ) : aSelection === "scissor" ? (
              <div className="selected-scissor"></div>
            ) : (
              <p>None</p>
            )}
          </div>
        </div>
        <div className="col-6 text-end text-secondary">
          <h2 className="users">User B-Machine</h2>

          <div className="selected-machine" style={{ marginTop: "150px" }}>
            <p className=" h2 my-auto">Selected By User B:</p>
            {bSelection === "rock" ? (
              <div className="selected-rockflip"></div>
            ) : bSelection === "paper" ? (
              <div className="selected-paperflip"></div>
            ) : bSelection === "scissor" ? (
              <div className="selected-scissorflip"></div>
            ) : (
              <p>None</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Machine;
