import './App.css';
import io from 'socket.io-client'
import {useEffect, useState} from "react";

const socket = io('http://localhost:3001')

function App() {
    const [userMessage, setUserMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    useEffect(() => {
        socket.on("receive_message", (serverMessage) => {
            setMessageList((prevMessageList) => [...prevMessageList, serverMessage]);
        });
    }, [socket]);


    const handlerSendMessage = () => {
        // const text = document.querySelector('input').value
        socket.emit('send-message', {message: userMessage})
    }

    const handlerWriteMessage = (event) => {
        setUserMessage(event.target.value)
    }

    return (
        <div className="App">
            <p>welcome to webSocket Application :)</p>
            <input placeholder={'message'} value={userMessage} onChange={handlerWriteMessage}/>
            <button onClick={handlerSendMessage}>Send Message</button>
            <ul>
                {Array.isArray(messageList) && messageList.map((message, index) => (
                    <li key={index}>{message.message}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
