import React, { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import User from "./User";
import Machine from "./Machine";

const Event = () => {
  const [connection] = useState(
    new HubConnectionBuilder()
      .withUrl("https://localhost:5000/chats")
      .withAutomaticReconnect()
      .build()
  );
  const [selected, setSelected] = useState("");
  const [mode, setMode] = useState("1");
  const [selection, setSelection] = useState("");
  const [result, setResult] = useState("");
  const [started, setStarted] = useState(false);
  const [startedBtn, setStartedbtn] = useState("Start Game");

  const [aSelection, setaSelection] = useState("");
  const [bSelection, setbSelection] = useState("");
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    connection.on("SendSelection", (result, selectionM) => {
      setSelection(selectionM);
      setResult(result);
    });

    connection.on("gameResults", (selection1, selection2, winner) => {
      setaSelection(selection1);
      setbSelection(selection2);
      setWinner(winner);
      console.log(selection1, selection2, winner);
    });
  }, [connection]);

  const startGame = async (e) => {
    e.preventDefault();
    setStarted(true);
    setStartedbtn("Started Game");
    await connection.start();

    if (mode === "2") {
      try {
        await connection.invoke("startGame");
      } catch (e) {
        console.log(e);
      }
    }
  };

  const stopConnection = async () => {

    setStarted(null);
    setStartedbtn("Start Game");

    if (connection) await connection.stop();

    setSelection("")
    setSelected("")
    setResult("");

  };

  const restartGame = async (e) =>{
    e.preventDefault();
    await connection.invoke("startGame");
  }

  const sendSelection = async (event) => {
    try {
      await connection.invoke("sendSelection", event);
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
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setMode(e.target.value);
                stopConnection();
              }}
            >
              <option value="1">User Vs Computer</option>
              <option value="2">Computer Vs Computer</option>
            </select>
          </div>
          <div className="col-4">
            <button
              disabled={started}
              className="btn btn-secondary"
              onClick={(e) => startGame(e)}
            >
              {startedBtn}
            </button>
          </div>
        </div>
      </div>
      <p> {started}</p>
      {started && (
        <>
          {mode === "1" ? (
            <User
              sendSelection={sendSelection}
              selection={selection}
              selected={selected}
              setSelected={setSelected}
            />
          ) : (
            <Machine aSelection={aSelection} bSelection={bSelection} />
          )}
        </>
      )}      
      {started &&
        (mode === "1" ? (
          result === "win" ? (
            <div className="text-center show">
              <p className="h2 text-center  result bg-success d-inline">
                You Have Won This Round!!!
              </p>
            </div>
          ) : result === "loss" ? (
            <div className="text-center show">
              <p className="h2 text-center result bg-primary d-inline">
                You Have Lost This Round!!!
              </p>
            </div>
          ) : result === "draw" ? (
            <div className="text-center show">
              <p className="h2 text-center result bg-info d-inline">
                Tie!!! Select Again
              </p>
            </div>
          ) : (
            <p></p>
          )
        ) : winner === 1 ? (
          <div className="text-center">
            <p className="h2 text-center result bg-info d-inline">
              User A Won This Round!!!
            </p>
            <br></br>
            <button className="btn btn-secondary" style={{marginTop:"20px"}} onClick={e =>restartGame(e)} >Start Game</button>
          </div>
        ) : winner === 2 ? (
          <div className="text-center">
            <p className="h2 text-center result bg-info d-inline">
              User B Won This Round!!!
            </p>
            <br></br>
            <button className="btn btn-secondary" style={{marginTop:"20px"}} onClick={e =>restartGame(e)}>Start Game</button>
          </div>
        ) : winner === 0 ? (
          <div className="text-center">
            <p className="h2 text-center result bg-info d-inline">
              Tie!!! Start Game
            </p>
            <br></br>
            <button className="btn btn-secondary" style={{marginTop:"20px"}} onClick={e =>restartGame(e)}>Go Next Round</button>
          </div>
        ) : (
          <p></p>
        ))
        }
    </div>
  );
};

export default Event;
