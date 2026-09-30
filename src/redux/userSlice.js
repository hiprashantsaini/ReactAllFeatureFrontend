import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        isGray:false,
        userData:null,
        featuresAccess:{}//key:featureId, value:true/false
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
            state.featuresAccess = {};
        },
        setFeatureAccess:(state,action)=>{
            const featureId=action.payload;
            state.featuresAccess[featureId]=true;
        },
        removeFeatureAccess:(state,action)=>{
            const featureId=action.payload;
            delete state.featuresAccess[featureId];
        }
    }
});

export const {toggleTheme, setUserData, clearUserData,setFeatureAccess,removeFeatureAccess} = userSlice.actions;

export default userSlice.reducer;