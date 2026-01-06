import z from "zod";

export const signupValidation = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  contact: z.string().min(1, "This field is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})


export const signinValidation = z.object({
  contact: z.string().min(1, "This field is required"),
  password: z.string().min(6, "Password must be at least 6 characters")
})

export const ForgotPasswordValidation = z.object({
  contact: z.string().min(1, "This field is required")
})


export const verifyOtpValidation = z.object({
    otp: z.string().length(6, "OTP must be 6 digits")
})


export const resetPasswordValidation = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
})