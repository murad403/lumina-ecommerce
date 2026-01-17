import z from "zod";

export const signupValidation = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})


export const signinValidation = z.object({
  email: z.string().min(1, "This field is required"),
  password: z.string().min(6, "Password must be at least 6 characters")
})

export const ForgotPasswordValidation = z.object({
  email: z.string().min(1, "This field is required")
})


export const verifyOtpValidation = z.object({
  otp: z.string().length(6, "OTP must be 6 digits")
})


export const resetPasswordValidation = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
})


export const contactValidation = z.object({
  first_name: z.string().min(1, "First name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  message: z.string().min(1, "Message is required")
})

export const personalInfoSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
})


export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})


export const notificationsSchema = z.object({
    orderUpdates: z.boolean(),
    promotions: z.boolean(),
})

export const checkoutSchema = z.object({
  contactType: z.enum(["email", "phone"]),
  contactValue: z.string().min(1, "Contact information is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  paymentMethod: z.enum(["bkash", "nagad", "bank", "cod"]),
  transactionId: z.string().min(1, "Transaction ID is required"),
  paidAmount: z.string().min(1, "Paid amount is required"),
})