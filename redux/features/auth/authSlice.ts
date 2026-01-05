import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
    user: null | string;
}

const initialState: TInitialState = {
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) =>{
            state.user = action.payload;
        }
    }
})

export const {setUser} = authSlice.actions;
export default authSlice.reducer;