import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import MessageSlice from "./MessageSlice";

const store = configureStore({
    reducer:{Auth: AuthSlice.reducer, Message: MessageSlice.reducer}
})

export const AuthAction = AuthSlice.actions;
export const MessageAction = MessageSlice.actions;
export default store;