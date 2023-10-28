import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMessage = createAsyncThunk(
  "Message/getData",
  async (arg, { rejectWithValue }) => {
    let chats = [];
    if (localStorage.chats) {
      const arr = JSON.parse(localStorage.getItem("chats"));
      chats = arr;
    }
    try {
      const token = localStorage.getItem("token");
      const ofs = chats.length > 0 ? chats[chats.length - 1].id : 0;
      const response = await fetch(
        `http://localhost:5000/message?offset=${ofs}`,
        {
          headers: { "Content-Type": "application/json", token: token },
        }
      );
      if (!response.ok) {
        throw new Error("Unable to fetch Expenses! Something went wronge.");
      } else {
        const data = await response.json();
        if (!data || data.length === 0) return [...chats].reverse();

        for (const key in data) {
          if (chats.length === 15) {
            chats.shift();
          }
          chats.push(data[key]);
        }
        localStorage.setItem("chats", JSON.stringify(chats));
        return [...chats].reverse();
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const MessageSlice = createSlice({
  name: "Message",
  initialState: { MessageArray: [] },
  reducers: {},
  extraReducers: {
    [getMessage.fulfilled]: (state, { payload }) => {
      state.MessageArray = payload;
    },
  },
});

export default MessageSlice;
