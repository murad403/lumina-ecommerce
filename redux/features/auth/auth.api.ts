import baseApi from "@/redux/api/baseApi";


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
        }),
        forgotPassword: builder.mutation({
            query: (data) =>{
                return {
                    url: "/password-reset/request/",
                    method: "POST",
                    body: data
                }
            }
        }),
        resetPasswordVerifyOtp: builder.mutation({
            query: (data) =>{
                return {
                    url: "/reset/otp-verify/",
                    method: "POST",
                    body: data
                }
            }
        }),
    })
})

export const {useSignUpMutation, useSignInMutation, useReGenerateOtpMutation, useForgotPasswordMutation, useVerifyOtpMutation, useResetPasswordVerifyOtpMutation} = authApi;