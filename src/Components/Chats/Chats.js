import React, { useState } from "react";
import style from "./Chats.module.css";
import { useDispatch, useSelector } from "react-redux";
import ChatList from "./ChatList";
import { getMessage } from "../Redux-Store/MessageSlice";
import { useParams } from "react-router-dom";


function Chats() {
  const params = useParams()
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.Auth);
  const [Text, setText] = useState("");
  const [AddMemberState , setAddMemberState] = useState(false);
  const [MemberEmail, setMemberEmail] = useState('');


  const groupId = params.groupId;

  const AddNewMember= async() =>{
   try {
   const response = await fetch(`http://localhost:5000/group/addmember?group=${+groupId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", token: Auth.token },
      body: JSON.stringify({ email: MemberEmail }),
    });
   
    if(response.ok){
      const result = await response.json();
      alert(result.message)
    }
   } catch (error){
    console.log(error)
   }
  }

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
      {!AddMemberState ? <button onClick={()=>setAddMemberState(true)}>Add Member</button> :
        <div>
          <input
            placeholder="Enter email"
            value={MemberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
          />
          <button disabled={!MemberEmail.includes('@')} onClick={AddNewMember} >Add Member</button>
          <button onClick={()=>setAddMemberState(false)} >Cancle</button>
        </div>}
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
