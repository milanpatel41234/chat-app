import React, { useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { getMessage } from "../Redux-Store/MessageSlice";


function ChatList({groupId}) {
  const Message = useSelector((state) => state.Message);
  const dispatch = useDispatch()


  useEffect(() => {
   dispatch(getMessage({groupId}))
  }, []);
  
  return (
    <>
      {Message.MessageArray.map((item) => {
        return <li key={item.id}>{`${item.user.name} : ${item.text}`}</li>;
      })}
    </>
  );
}

export default ChatList;
