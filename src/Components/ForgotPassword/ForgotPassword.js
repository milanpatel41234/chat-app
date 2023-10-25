import React, { useReducer } from "react";
import style from "./ForgotPassword.module.css";
import Button from "../UI-Store/Button/Button";
import Input from "../UI-Store/Input/Input";
import { Link, useNavigate } from "react-router-dom";

const emailReduser = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  } else if (action.type === "input_valid") {
    return { value: state.value, isValid: action.isValid };
  }
  return { value: "", isValid: null };
};

function ForgotPassword() {
  const navigate = useNavigate();
  const [emailState, dispatchEmail] = useReducer(emailReduser, {
    value: "",
    isValid: null,
  });

  const HandleEmail = (e) => {
    dispatchEmail({ type: "INPUT", val: e.target.value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    let obj = {
      email: emailState.value,
    };
    try {
      const res = await fetch(`http://localhost:5000/forgotpassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      });
      const result = await res.json();
      if (result.success) {
        alert(result.message);
        navigate("/login");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.container}>
      <h4>Send reset Link</h4>
      <form onSubmit={HandleSubmit}>
        <Input
          id="Email"
          type="text"
          isValid={emailState.isValid}
          onChange={HandleEmail}
          value={emailState.value}
        />
        <div className={style.actions}>
          <Button type="submit" disabled={!emailState.isValid}>
            Send Link
          </Button>
        </div>
      </form>
      <Link className={style.link} to="/signup">
        Sign Up
      </Link>
      <Link className={style.link} to="/login">
        Login
      </Link>
    </div>
  );
}

export default ForgotPassword;
