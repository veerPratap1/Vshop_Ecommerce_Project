import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  UpdateUserInfo,
  fetchAllUser,
  fetchLogedInUser,
  fetchUserOrderById,
} from "./UserApi";

const initialState = {
  status: "idle",
  userInfo: null,
  AllUsers: [],
};

export const fetchUserOrderByIdAsync = createAsyncThunk(
  "user/fetchUserOrderById",
  async () => {
    const response = await fetchUserOrderById();
    return response.data;
  }
);
export const UpdateUserInfoAsync = createAsyncThunk(
  "user/UpdateUserInfo",
  async (user) => {
    const response = await UpdateUserInfo(user);
    return response.data;
  }
);
export const fetchLogedInUserAsync = createAsyncThunk(
  "user/fetchLogedInUser",
  async () => {
    const response = await fetchLogedInUser();
    return response.data;
  }
);
export const fetchAllUserAsync = createAsyncThunk(
  "user/fetchAllUser",
  async () => {
    const response = await fetchAllUser();
    return response.data;
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrderByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrderByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo.orders = action.payload;
      })
      .addCase(fetchLogedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(fetchAllUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.AllUsers = action.payload
      })
      .addCase(UpdateUserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateUserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      });
  },
});

export const { increment } = UserSlice.actions;

export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserOrderStatus = (state) => state.user.status;
export const selectAllUser = (state) => state.user.AllUsers;

export default UserSlice.reducer;
