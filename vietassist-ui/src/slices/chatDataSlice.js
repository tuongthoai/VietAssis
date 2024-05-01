import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    history: [],
    prompt: ''
}

const chatDataSlice = createSlice({
    name: 'chatData',
    initialState,
    reducers: {
        addToChatDataHistory: (state, action) => {
            state.history.push(action.payload);
        },
        updatePrompt: (state, action) => {
            state.prompt = action.payload
        }
    }
});

export const { addToChatDataHistory, updatePrompt } = chatDataSlice.actions;

export default chatDataSlice.reducer;