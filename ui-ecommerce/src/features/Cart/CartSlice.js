import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCartById, deleteCartItem, fetchCartItemsById, resetCart, updateCart } from './CartAPI';

const initialState = {
  items: [],
  status: 'idle',
  cartChecked: false
};

export const addToCartByIdAsync = createAsyncThunk(
  'item/addToCartById',
  async (item) => {
    const response = await addToCartById(item);
    return response.data;
  }
);
export const fetchCartItemsByIdAsync = createAsyncThunk(
  'item/fetchCartItemsById',
  async () => {
    const response = await fetchCartItemsById();
    return response.data;
  }
);
export const updateCartAsync = createAsyncThunk(
  'item/updateCart',
  async (updateItem) => {
    const response = await updateCart(updateItem);
    return response.data;
  }
);
export const deleteCartItemAsync = createAsyncThunk(
  'item/deleteCartItem',
  async (removeItem) => {
    const response = await deleteCartItem(removeItem);
    return response.data;
  }
);
export const resetCartAsync = createAsyncThunk(
  'item/resetCart',
  async () => {
    const response = await resetCart();
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    increment: (state) => {
      
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload) ;
      })
      .addCase(fetchCartItemsByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItemsByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload ;
        state.cartChecked = true
      })
      .addCase(fetchCartItemsByIdAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.cartChecked = true
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item)=>item.id===action.payload.id)
        state.items[index]= action.payload ;
      })
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item)=>item.id===action.payload.id)
        state.items.splice(index,1)
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = []
      })
  },
});

export const { increment} = cartSlice.actions;


export const selectCartItem = (state) => state.cart.items;
export const selectCartItemStatus = (state) => state.cart.status;
export const selectCartChecked = (state) => state.cart.cartChecked;


export default cartSlice.reducer;
