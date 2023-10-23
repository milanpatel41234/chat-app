import { createSlice } from "@reduxjs/toolkit";

let token = '' ;
let userLogin = false;
if(localStorage.Token){
    token = localStorage.getItem('token');
    userLogin = true;
}

const initialState = {
    token: token,
    LoginState: userLogin,
}

const AuthSlice = createSlice({
    name:'Auth',
    initialState,
    reducers:{
        setLogin (state,action){
            state.token = action.payload.token;
            state.LoginState = true;
            localStorage.setItem('token', action.payload.token);
         },
         setLogout (state){
            state.token = null;
            state.LoginState = false;
            localStorage.removeItem('token');
         }
    }
})
export default AuthSlice;