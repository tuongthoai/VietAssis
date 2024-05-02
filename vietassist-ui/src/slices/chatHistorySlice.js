import { createSlice } from "@reduxjs/toolkit";

const emptyMsg = {
    type: "suggest",
}

const initialState = {
    value: [emptyMsg],
    currentPos: 0,
}

const chatHistorySlice = createSlice({
    name: 'chatHistory',
    initialState,
    reducers: {
        addToChatHistory: (state, action) => {
            state.value.push(action.payload);
        },
        updateCurrentPos: (state, action) => {
            state.currentPos = action.payload;
        },
        updateChatHistory: (state, action) => {
            state.value = action.payload;
        },
        replaceLastResponseMsg: (state, action) => {
            const updatedHistory = [...state.value];
            updatedHistory[state.currentPos] = {
                ...updatedHistory[state.currentPos],
                isLoading: false,
            }
            state.value = updatedHistory;
        }

    }
});

export const { addToChatHistory, updateCurrentPos, updateChatHistory, replaceLastResponseMsg } = chatHistorySlice.actions;

export default chatHistorySlice.reducer;