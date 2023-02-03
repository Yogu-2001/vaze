import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice";
import { alertSlice } from "./features/alertSlice";
import { commentSlice } from "./features/commentSlice";
export default configureStore({
  reducer: {
    user: userSlice.reducer,
    alert: alertSlice.reducer,
    comment: commentSlice.reducer,
  },
});
