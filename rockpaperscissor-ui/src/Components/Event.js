import React, { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

const Event = () => {
  const [connection] = useState(
    new HubConnectionBuilder()
      .withUrl("https://localhost:5000/chats")
      .withAutomaticReconnect()
      .build()
  );
  const [user, setUser] = useState("");
  const [selected, setSelected] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    connection.on("SendMessage", (message) => {
      console.log(message);
      // setMessages(messages => [...messages, {user, message}])
    });
  }, [messages, connection]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const chatMessage = { user: user, room: room };
    try {
      connection.on("RecieveMessage", (user, message) => {
        setMessages((messages) => [...messages, { user, message }]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", chatMessage);
      // setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };

  const startGame = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      await connection.start();
      await connection.invoke("SendMessage", { user, room });
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
              <button id="rock" className="rock" onClick={e =>{ e.preventDefault(); setSelected(e.target.id);}} ></button>
            </div>
            <div className="col-md-4 text-center">
              <button id="paper" className="paper" onClick={e =>{ e.preventDefault(); setSelected(e.target.id);}}></button>
            </div>
            <div className="col-md-4">
              <button id="scissor" className="scissor" onClick={e =>{ e.preventDefault(); setSelected(e.target.id);}}></button>
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
      <p>{selected}</p>

      <form>
        <label htmlFor="user">User:</label>
        <br />
        <input
          id="user"
          name="user"
          onChange={(e) => setUser(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room:</label>
        <br />
        <input
          type="text"
          id="room"
          name="room"
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <br />
        <button
          className="btn btn-primary"
          disabled={!user || !room}
          onClick={(e) => onSubmit(e)}
        >
          Submit
        </button>
        <button
          className="btn btn-primary"
          disabled={!user || !room}
          onClick={(e) => sendMessage(e)}
        >
          Send Msg
        </button>

        <br></br>
        <br></br>
        {/* {messages.map((msg, index)=>
                <div key={index}>
                    <p>{msg.message}</p>
                    <p>{msg.user}</p>
                </div>
            )
            } */}
      </form>
      <hr />
    </div>
  );
};

export default Event;
