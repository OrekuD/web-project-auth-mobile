import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthenticationState } from "../types";
import API from "../../constants/api";

const initialState: AuthenticationState = {
  isAuthenticated: false,
  accessToken: "",
  expiryAt: -1
};

const slice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    signOut: () => {
      API.removeAccessToken();
      return initialState;
    },
    addAuthState: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
    }
  }
});

export const authenticationActions = slice.actions;

export default slice.reducer;
