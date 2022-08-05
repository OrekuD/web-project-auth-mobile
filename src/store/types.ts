import {PayloadAction} from '@reduxjs/toolkit';

export interface AuthenticationState {
  isAuthenticated: boolean;
  accessToken: string;
}

export type CPA<T = any> = PayloadAction<T> & {dispatch: Function};
