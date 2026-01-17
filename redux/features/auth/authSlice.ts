import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
    id: null | string;
    user: string | null;
}

const initialState: TInitialState = {
    id: null,
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSignUpUser: (state, action) =>{
            state.user = action.payload;
        }
    }
})

export const {setSignUpUser} = authSlice.actions;
export default authSlice.reducer;