import React from "react";
import style from "./Chats.module.css";

function Chats() {
  return (
    <div className={style.chatpage}>
      <div class={style.chatContainer}></div>
      <div class={style.inputContainer}>
        <input type="text" placeholder="Type your message..." />
        <button>Send</button>
      </div>
    </div>
  );
}

export default Chats;
