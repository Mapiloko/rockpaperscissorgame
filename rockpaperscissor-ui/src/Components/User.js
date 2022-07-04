import React from "react";

function User({selected, setSelected, selection, sendSelection }) {
  return (
    <div className="row" style={{ marginTop: "50px" }}>
        <div className=" col-6 text-secondary left">
          <h2 className="users">User A-You</h2>
          <p className="text-center select h2">Make Your Selection</p>
          <div className="row">
            <div className="col-md-4 text-end">
              <button id="rock" className="rock" onClick={e =>{ e.preventDefault(); setSelected(e.target.id); sendSelection(e.target.id);}} ></button>
            </div>
            <div className="col-md-4 text-center">
              <button id="paper" className="paper" onClick={e =>{ e.preventDefault(); setSelected(e.target.id); sendSelection(e.target.id);}}></button>
            </div>
            <div className="col-md-4">
              <button id="scissor" className="scissor" onClick={e =>{ e.preventDefault(); setSelected(e.target.id); sendSelection(e.target.id);}}></button>
            </div>
          </div>
          <div className="selected">
            <p className=" h2 my-auto">Selected By User:</p>    
            { selected === "rock"? <div className="selected-rock"></div> :
              selected === "paper"? <div className="selected-paper"></div> :
              selected === "scissor"? <div className="selected-scissor"></div> : <p>None</p>
            }
          </div>
        </div>
        <div className="col-6 text-end text-secondary">
          <h2 className="users">User B-Machine</h2>

          <div className="selected-machine">
            <p className=" h2 my-auto">Selected By Machine:</p>    
            { selection === "rock"? <div className="selected-rockflip"></div> :
              selection === "paper"? <div className="selected-paperflip"></div> :
              selection === "scissor"? <div className="selected-scissorflip"></div> : <p>None</p>
            }
          </div>
        </div>
    </div>
  );
}

export default User;
