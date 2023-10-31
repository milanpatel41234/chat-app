import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./Home.module.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [Groups, setGroups] = useState(
    localStorage.groups ? localStorage.getItem("groups") : []
  );
  const [GroupName, setGroupName] = useState("");
  const [NewGroupState , setNewGroupState] = useState(false)
  const Auth = useSelector((state) => state.Auth);

  const fetchGroups=useCallback(async()=> {
    try {
      const response = await fetch(`http://localhost:5000/group`, {
        headers: { "Content-Type": "application/json", token: Auth.token },
      });
      if(!response.ok) return;
      const data = await response.json();
      if (data.length === 0) return;
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  },[])
  useEffect(() => {
    fetchGroups();
  },[]);

  const OpenChat = (groupId) => {
    navigate(`/chats/${groupId}`);
  };
  const CreateGroup = async() =>{
    try {
       const response = await fetch("http://localhost:5000/group", {
          method: "POST",
          headers: { "Content-Type": "application/json", token: Auth.token },
          body: JSON.stringify({ name:GroupName}),
        });
        if(response.ok){
           alert('Group created successfully')
            fetchGroups();
        }else throw new Error('Group creation failed')
      } catch (error) {
        alert(error);
      }
  }

  return (
    <div className={style.groupContainer}>
      <header className={style.header}>
        <h3>Your Groups</h3>
        {!NewGroupState ? <button onClick={()=>setNewGroupState(true)}>New group</button> :
        <div>
          <input
            placeholder="New Group Name"
            value={GroupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <button disabled={GroupName.trim().length===0} onClick={CreateGroup} >Create</button>
          <button onClick={()=>setNewGroupState(false)} >Cancle</button>
        </div>}
      </header>
      <ul className={style.grouplist}>
        {Groups.map((group) => {
          return (
            <li key={group.id} onClick={OpenChat.bind(null, group.id)}>
              {group.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Home;
