import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../models/User";

const initialState: User = {
  _id: "",
  email: "",
  firstName: "",
  lastName: ""
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<{ user: User }>) => {
      state._id = action.payload.user._id;
      state.email = action.payload.user.email;
      state.firstName = action.payload.user.firstName;
      state.lastName = action.payload.user.lastName;
    },
    signOut: () => initialState
  }
});

export const userActions = slice.actions;

export default slice.reducer;
