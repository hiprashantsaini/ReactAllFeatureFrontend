import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        isGray:false,
    },
    reducers:{
        toggleTheme:(state,action)=>{
              state.isGray = !state.isGray;
        }
    }
});

export const {toggleTheme} = userSlice.actions;

export default userSlice.reducer;