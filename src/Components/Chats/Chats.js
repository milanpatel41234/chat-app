import React, { useState } from "react";
import style from "./Chats.module.css";
import { useDispatch, useSelector } from "react-redux";
import ChatList from "./ChatList";
import { getMessage } from "../Redux-Store/MessageSlice";


function Chats() {
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.Auth);
  const [Text, setText] = useState("");

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
      dispatch(getMessage(0));
      setText('');
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className={style.chatpage}>
      <div className={style.chatContainer}>
        <ul className={style.chatlist}>
       <ChatList/>
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
