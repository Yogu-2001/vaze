import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "user",
  initialState: { comments: [] },
  reducers: {
    setComments: (state, action) => {
      state.comments.push([...state.comments, action.payload]);
    },
  },
});

export const { setComments } = commentSlice.actions;
