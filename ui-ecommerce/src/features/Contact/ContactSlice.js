import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createMessage, fetchAllMessage } from './ContactApi';

const initialState = {
  messages: [],
  status: 'idle',
};

export const createMessageAsync = createAsyncThunk(
  'message/createMessage',
  async (message) => {
    const response = await createMessage(message);
    return response.data;
  }
);
export const fetchAllMessageAsync = createAsyncThunk(
  'message/fetchAllMessage',
  async () => {
    const response = await fetchAllMessage();
    return response.data;
  }
);

export const ContactSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    increment: (state) => {
      
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMessageAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createMessageAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.messages.push(action.payload)
      })
      .addCase(fetchAllMessageAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllMessageAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.messages = action.payload
      })
  },
});

export const { increment} = ContactSlice.actions;


export const selectAllMessages = (state) => state.message.messages ;

 
export default ContactSlice.reducer;
