import { createSlice } from "@reduxjs/toolkit";

 const initialstate={
    status:false,
    userData:null
 }


const authSlice=createSlice({
    name:"auth",initialstate,
    reducers:{

     login:(action,state)=>{
        state.status=true
        state.userData=action.payload.userData
     },

     logOut:(action,state)=>{
        state.status=false,
        state.userData=null
     }             //we are only tracking login and logout of user we can for "POST" also

    }
})

export const{login,logOut} = authSlice.actions;

export default authSlice.reducer;