import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Nullable, SignInData, SignUpData, User } from "../../../../global";
import { HYDRATE } from "../../../constants";
import { RootState } from "../../store";

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    });

    builder.addCase(signUpUser.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    });

    builder.addCase(signInUser.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    });
  },
});

export const signUpUser = createAsyncThunk("/api/sign-up", async (data: Nullable<SignUpData>) => {
  return await fetch("/api/sign-up", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  }).then((res) => res.json());
});

export const signInUser = createAsyncThunk("/api/sign-in", async (data: SignInData) => {
  return await fetch("/api/sign-in", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
});

export const fetchUser = createAsyncThunk("/api/user", async (id: string) => {
  return await fetch(`http://localhost:3000/api/user`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .catch((e) => {
      console.log("Error fetching user", e);
    })
    .then((res) => res && res.json());
});

export const userReducer = userSlice.reducer;

export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectUser = (state: RootState) => state.user.user;
