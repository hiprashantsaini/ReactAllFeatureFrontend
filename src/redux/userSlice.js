import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        isGray:false,
        userData:null,
    },
    reducers:{
        toggleTheme:(state,action)=>{
              state.isGray = !state.isGray;
        },
        setUserData:(state,action)=>{
            state.userData = action.payload;
        },
        clearUserData:(state,action)=>{
            state.userData = null;
        }
    }
});

export const {toggleTheme, setUserData, clearUserData} = userSlice.actions;

export default userSlice.reducer;