import baseApi from "@/redux/api/baseApi";
import { verify } from "crypto";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        signUp: builder.mutation({
            query: (data) =>{
                return {
                    url: "/register/",
                    method: "POST",
                    body: data
                }
            }
        }), 
        signIn: builder.mutation({
            query: (data) =>{
                return {
                    url: "/login/",
                    method: "POST",
                    body: data
                }
            }
        }), 
        reGenerateOtp: builder.mutation({
            query: (data) =>{
                return {
                    url: "/otp/create/",
                    method: "POST",
                    body: data
                }
            }
        }),
        verifyOtp: builder.mutation({
            query: (data) =>{
                return {
                    url: "/otp/verify/",
                    method: "POST",
                    body: data
                }
            }
        })
    })
})

export const {useSignUpMutation, useSignInMutation, useReGenerateOtpMutation, useVerifyOtpMutation} = authApi;