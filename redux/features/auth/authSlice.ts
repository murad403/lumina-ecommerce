import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
    user: {
        id: null | string;
        user: {
            email: string;
            [key: string]: any;
            } | null;
    } | null;
}

const initialState: TInitialState = {
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSignUpUser: (state, action) => {
            state.user = action.payload;
        }
    }
})

export const { setSignUpUser } = authSlice.actions;
export default authSlice.reducer;