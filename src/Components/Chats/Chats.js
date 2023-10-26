import React, { useEffect, useState } from "react";
import style from "./Chats.module.css";
import { useSelector } from "react-redux";

function Chats() {
  const Auth = useSelector((state) => state.Auth);
  const [Text, setText] = useState("");
  const [Messages , setMessages] = useState([])

  const HandleText = (e) => {
    setText(e.target.value);
  };
  const SendMessage = async () => {
    try {
      await fetch("http://localhost:5000/message", {
        method: "POST",
        headers: { "Content-Type": "application/json", token: Auth.token },
        body: JSON.stringify({ message: Text }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getMessage = async()=>{
    try {
     const response = await fetch("http://localhost:5000/message", {
        headers: { "Content-Type": "application/json", token: Auth.token },
      });
      const data = await response.json();
     setMessages(data);
    } catch (error) {
        
    }
  }

  useEffect(()=>{
   getMessage()
  },[])

const ChatList = Messages.map((item)=>{
    return <li key={item.id}>{`${item.user.name} : ${item.text}`}</li>
})

  return (
    <div className={style.chatpage}>
      <div className={style.chatContainer}>
        <ul className={style.chatlist}>
        {ChatList}
        </ul>
      </div>
      <div className={style.inputContainer}>
        <input
          value={Text}
          onChange={HandleText}
          type="text"
          placeholder="Type your message..."
        />
        <button disabled={Text.length === 0} onClick={SendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chats;
