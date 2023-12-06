import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  checkAuth,
  checkUser,
  createUser,
  resetPassword,
  resetPasswordRequest,
  signOutUser,
} from "./AuthAPI";

const initialState = {
  loggedInUserToken: null,
  status: "idle",
  errors: null,
  userChecked: false,
  mailSent: false,
  PasswordReset: false
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);
export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await checkUser(loginData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const checkAuthAsync = createAsyncThunk("user/checkAuth", async () => {
  const response = await checkAuth();
  return response.data;
});
export const resetPasswordRequestAsync = createAsyncThunk(
  "user/resetPasswordRequest",
  async (email, { rejectWithValue }) => {
    try {
      const response = await resetPasswordRequest(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const resetPasswordAsync = createAsyncThunk(
  "user/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPassword(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const signOutUserAsync = createAsyncThunk(
  "user/signOutUser",
  async () => {
    
      const response = await signOutUser();
      return response.data; }
);

export const AuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.errors = action.payload;
      })
      .addCase(signOutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      })
      .addCase(signOutUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.errors = action.payload;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked = true;
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.mailSent = true;
      })
      .addCase(resetPasswordRequestAsync.rejected, (state, action) => {
        state.status = "idle";
        state.mailSent = false;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.PasswordReset = true;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = "idle";
        state.errors = action.payload;
      });
  },
});

export const { increment } = AuthSlice.actions;

export const selectLoginUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.errors;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectmailSent = (state) => state.auth.mailSent;
export const selectPasswordReset = (state) => state.auth.PasswordReset;
export const selectAuthStatus = (state) => state.auth.status;

export default AuthSlice.reducer;
