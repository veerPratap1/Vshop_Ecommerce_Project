import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  createPdf,
  fetchAllOrders,
  fetchOrderById,
  updateOrder,
} from "./OrderAPI";
const initialState = {
  orders: [],
  status: "idle",
  currentOrder: null,
  totalOrders: null,
  selectedOrder: null,
  createdPdf: null,
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (item) => {
    const response = await createOrder(item);
    return response.data;
  }
);
export const createPdfAsync = createAsyncThunk(
  "order/createPdf",
  async (item) => {
    const response = await createPdf(item);
    return response.data;
  }
);
export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async ({ sort, pagination }) => {
    const response = await fetchAllOrders(sort, pagination);
    return response.data;
  }
);
export const fetchOrderByIdAsync = createAsyncThunk(
  "order/fetchOrderById",
  async (id) => {
    const response = await fetchOrderById(id);
    return response.data;
  }
);
export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (order) => {
    const response = await updateOrder(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createPdfAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPdfAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.createdPdf = action.payload
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(fetchOrderByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedOrder = action.payload;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        state.orders[index] = action.payload;
      });
  },
});

export const { resetOrder} = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;
export const selectOrdersById = (state) => state.order.selectedOrder;
export const selectOrderStatus = (state) => state.order.status;
export const seletctCreatedPdf = (state) => state.order.createdPdf;

export default orderSlice.reducer;
