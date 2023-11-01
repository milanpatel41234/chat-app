import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./GroupDetails.module.css";
import { useParams } from "react-router-dom";

function GroupDetails() {
  const params = useParams();
  const [Members, setMembers] = useState([]);
  const [AddMemberState, setAddMemberState] = useState(false);
  const [IsAdmin, setIsAdmin] = useState(false);
  const [AdminId, setAdminId] = useState(null);
  const [MemberEmail, setMemberEmail] = useState("");
  const Auth = useSelector((state) => state.Auth);

  const groupId = params.groupId;
  const groupName = params.groupName;

  const fetchMembers = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/group/member?group=${groupId}`,
        {
          headers: { "Content-Type": "application/json", token: Auth.token },
        }
      );
      if (!response.ok) throw new Error(response.error);
      const data = await response.json();
      setAdminId(data.adminId);
      setIsAdmin(data.isAdmin);
      setMembers(data.members);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchMembers();
  }, []);

  const RemoveMember = async (memberId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/group/removemember?group=${+groupId}&member=${+memberId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json", token: Auth.token },
          body: JSON.stringify({ email: MemberEmail }),
        }
      );
      if (response.ok) {
        fetchMembers();
      }
    } catch (error) {}
  };
  const AddNewMember = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/group/addmember?group=${+groupId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", token: Auth.token },
          body: JSON.stringify({ email: MemberEmail }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        if (response.success) {
          fetchMembers();
          setMemberEmail("");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.groupContainer}>
      <header className={style.header}>
        <h3>{groupName}</h3>
        {IsAdmin && (
          <div>
            {!AddMemberState ? (
              <button onClick={() => setAddMemberState(true)}>
                Add Member
              </button>
            ) : (
              <div>
                <input
                  placeholder="Enter email"
                  value={MemberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                />
                <button
                  disabled={!MemberEmail.includes("@")}
                  onClick={AddNewMember}
                >
                  Add Member
                </button>
                <button onClick={() => setAddMemberState(false)}>Cancle</button>
              </div>
            )}
          </div>
        )}
      </header>
      <ul className={style.grouplist}>
        {Members.map((member) => {
          return (
            <li key={member.id}>
              <p>{member.name}</p>
              {IsAdmin && AdminId !== member.id && (
                <button onClick={RemoveMember.bind(null, member.id)}>
                  Remove
                </button>
              )}
              {AdminId === member.id && <i>Admin</i>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default GroupDetails;
