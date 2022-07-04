import React, { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

const Event = () => {
  const [connection] = useState(
    new HubConnectionBuilder()
      .withUrl("https://localhost:5000/chats")
      .withAutomaticReconnect()
      .build()
  );
  const [selected, setSelected] = useState("");
  const [selection, setSelection] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    connection.on("SendSelection", (result, selectionM) => {
      console.log(result, selectionM);
      setSelection(selectionM);
      setResult(result);
    });
  }, [connection]);

  const startGame = async (e) => {
    e.preventDefault();
    await connection.start();
  };

  const sendSelection = async (event) => {
    try {
      await connection.invoke("sendSelection", event );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="row justify-content-center">
          <div className="play-mode col-4 text-end">
            <h2>Select Play Mode</h2>
          </div>
          <div className="col-4">
            <select className="form-select" aria-label="Default select example">
              <option value="1">User Vs Computer</option>
              <option value="2">Computer Vs Computer</option>
            </select>
          </div>
          <div className="col-4">
            <button className="btn btn-secondary" onClick={(e) => startGame(e)}>
              Start Game
            </button>
          </div>
        </div>
      </div>

      <div className="row" style={{ marginTop: "50px" }}>
        <div className=" col-6 text-secondary left">
          <h2 className="users">User A</h2>
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
            <p className=" h2 my-auto">Selected:</p>    
            { selected === "rock"? <div className="selected-rock"></div> :
              selected === "paper"? <div className="selected-paper"></div> :
              selected === "scissor"? <div className="selected-scissor"></div> : <p>None</p>
            }
          </div>
        </div>
        <div className="col-6 text-end text-secondary">
          <h2 className="users">User B</h2>
        </div>
      </div>
    </div>
  );
};

export default Event;
