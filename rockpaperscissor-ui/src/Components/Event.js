import React, { useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const Event = () => {

    const [ connection, setConnection ] = useState(null);
    const [user, setUser] = useState('');
    const [room, setRoom] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        const chatMessage = {
            user: user,
            room: room
        };
        try
        {
            const connection = new HubConnectionBuilder()
                                .withUrl('https://localhost:5000/chats')
                                .withAutomaticReconnect()
                                .build();
            console.log("Here")
            connection.on("Recievemessage",( usr, msg)=>{
                console.log("message recieved", msg, usr)
            });

            await connection.start()
            await connection.invoke("JoinRoom", chatMessage)
            setConnection(connection);
        }
        catch(e)
        {
            console.log(e)
        }

    }

    return (
        <div>
            <form>
            <label htmlFor="user">User:</label>
            <br />
            <input id="user" name="user" onChange={e => setUser(e.target.value)} />
            <br/>
            <label htmlFor="room">Room:</label>
            <br />
            <input type="text" id="room" name="room" onChange={e=> setRoom(e.target.value)} />
            <br/><br/>
            <button className="btn btn-primary" disabled={!user || ! room} onClick={e => onSubmit(e)} >Submit</button>

            </form>
            <hr />
        </div>
    );
};

export default Event;