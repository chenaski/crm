import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Nullable } from "~/global";
import { ServerError } from "~/server/dto/server-error";
import { SignInInput } from "~/server/dto/sign-in-input";
import { SignInReply } from "~/server/dto/sign-in-reply";
import { SignUpInput } from "~/server/dto/sign-up-input";
import { User } from "~/server/dto/user";

import { HYDRATE } from "~/core/constants";
import { dateProcessor } from "~/core/helpers/DateProcessor";
import { ServerProcessor } from "~/core/helpers/ServerProcessor";
import { withPayloadType } from "~/core/store/helpers/withPayloadType";
import { RootState } from "~/core/store/store";

export type ClientUser = User & { timeSinceLastUpdate: string };

interface UserState {
  user: ClientUser | null;
  isLoggedIn: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  error: null,
};

const formatUser = (user: User): ClientUser => {
  const clientUser: ClientUser = {
    ...user,
    timeSinceLastUpdate: dateProcessor.getDateSince(new Date(user.updatedAt)),
  };

  return clientUser;
};

const handleAuthResponse = (response: unknown): UserState => {
  const isErrorResponse = (response: unknown): response is ServerError => {
    return !!(response as ServerError)?.error?.message;
  };
  const isSuccessResponse = (response: unknown): response is SignInReply => {
    return !!(response as SignInReply)?.user;
  };

  if (isSuccessResponse(response)) {
    return {
      user: formatUser(response.user),
      isLoggedIn: true,
      error: null,
    };
  } else if (isErrorResponse(response)) {
    return {
      user: null,
      isLoggedIn: false,
      error: response.error.message,
    };
  } else {
    return {
      user: null,
      isLoggedIn: false,
      error: "Something went wrong",
    };
  }
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
        ...handleAuthResponse(action.payload),
      };
    });

    builder.addCase(signInUser.fulfilled, (state, action) => {
      return {
        ...state,
        ...handleAuthResponse(action.payload),
      };
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      return {
        ...state,
        ...handleAuthResponse(action.payload),
      };
    });

    builder.addCase(setError, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });
  },
});

export const setError = createAction("setError", withPayloadType<UserState["error"]>());

export const signUpUser = createAsyncThunk("/sign-up", async (data: Nullable<SignUpInput>) => {
  return await fetch(ServerProcessor.buildPath("/sign-up"), {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  }).then((res) => res.json());
});

export const signInUser = createAsyncThunk("/sign-in", async (data: SignInInput) => {
  return await fetch(ServerProcessor.buildPath("/sign-in"), {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  }).then((res) => res.json());
});

export const fetchUser = createAsyncThunk("/user", async ({ id, cookie }: { id: string; cookie: string }) => {
  return await fetch(ServerProcessor.buildPath(`/user/${id}`), {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    credentials: "include",
  }).then((res) => res.json());
});

export const userReducer = userSlice.reducer;

export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectError = (state: RootState) => state.user.error;
export const selectUser = (state: RootState) => state.user.user;
