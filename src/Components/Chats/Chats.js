import React, { useState } from "react";
import style from "./Chats.module.css";
import { useDispatch, useSelector } from "react-redux";
import ChatList from "./ChatList";
import { getMessage } from "../Redux-Store/MessageSlice";
import {Link, useParams} from "react-router-dom";


function Chats() {
  const params = useParams();
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.Auth);
  const [Text, setText] = useState("");



  const groupId = params.groupId;
  const groupName = params.groupName;
console.log(groupName)

  const SendMessage = async () => {
    try {
      await fetch(`http://localhost:5000/message?group=${+groupId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", token: Auth.token },
        body: JSON.stringify({ message: Text }),
      });
      dispatch(getMessage({groupId}));
      setText('');
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className={style.chatpage}>
      <div className={style.chatContainer}>
      <header className={style.header}>
        <Link to={`/groupdetails/${groupId}/${groupName}`} ><h3>{groupName}</h3></Link>
        </header>
        <ul className={style.chatlist}>
       <ChatList groupId={groupId}/>
        </ul>
      </div>
      <div className={style.inputContainer}>
        <input
          value={Text}
          onChange={(e)=>{setText(e.target.value)}}
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
