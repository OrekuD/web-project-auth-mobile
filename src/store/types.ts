import { PayloadAction } from "@reduxjs/toolkit";

export interface AuthenticationState {
  isAuthenticated: boolean;
  accessToken: string;
  expiryAt: number;
}

export type CPA<T = any> = PayloadAction<T> & { dispatch: Function };
