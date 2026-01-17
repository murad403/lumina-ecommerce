import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
    user: {
        id: null | string;
        user: {
            email: string;
            [key: string]: any;
            } | null;
    } | null;
    otp: string | null;
}

const initialState: TInitialState = {
    user: null,
    otp: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSignUpUser: (state, action) => {
            state.user = action.payload;
        },
        setUserOtp: (state, action) =>{
            state.otp = action.payload;
        }
    }
})

export const { setSignUpUser, setUserOtp } = authSlice.actions;
export default authSlice.reducer;