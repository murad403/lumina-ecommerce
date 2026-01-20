import { TCurrentUser } from "@/types/all";
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
    currentUser: TCurrentUser | null;
}

const initialState: TInitialState = {
    user: null,
    otp: null,
    currentUser: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSignUpUser: (state, action) => {
            state.user = action.payload;
        },
        setUserOtp: (state, action) => {
            state.otp = action.payload;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    }
})

export const { setSignUpUser, setUserOtp, setCurrentUser } = authSlice.actions;
export default authSlice.reducer;