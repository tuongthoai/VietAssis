import { createSlice } from "@reduxjs/toolkit";

const emptyMsg = {
    type: "empty",
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
            console.log(action.payload);
            console.log(JSON.stringify(state.value));
            console.log(state.currentPos);
            const updatedHistory = [...state.value];
            updatedHistory[state.currentPos] = {
                ...updatedHistory[state.currentPos],
                isLoading: false,
            }
            state.value = updatedHistory;
            console.log('afterupdate\n', JSON.stringify(state.value));
        }

    }
});

export const { addToChatHistory, updateCurrentPos, updateChatHistory, replaceLastResponseMsg } = chatHistorySlice.actions

export default chatHistorySlice.reducer