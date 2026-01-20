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
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required")
})

export const ForgotPasswordValidation = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address")
})


export const verifyOtpValidation = z.object({
  otp: z.string().length(6, "OTP must be 6 digits")
})


const commonPasswords = [
  '12345678', '123456789', '1234567890',
  'password', 'qwerty', 'abc123',
  '11111111', '00000000', '87654321'
]

export const resetPasswordValidation = z.object({
  new_password: z
    .string()
    .min(8, "This password is too short. It must contain at least 8 characters.")
    .refine((password) => !/^\d+$/.test(password), {
      message: "This password is entirely numeric."
    })
    .refine((password) => !commonPasswords.includes(password.toLowerCase()), {
      message: "This password is too common."
    })
    .refine((password) => /[a-zA-Z]/.test(password), {
      message: "Password must contain at least one letter."
    }),

  confirm_password: z
    .string()
    .min(8, "Please confirm your password")
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"]
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


export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, "Review must be at least 10 characters").max(1000, "Review must be less than 1000 characters")
})

export const addressSchema = z.object({
  label: z.string().min(1, "Label is required").max(50, "Label must be less than 50 characters"),
  address: z.string().min(10, "Address must be at least 10 characters").max(200, "Address must be less than 200 characters"),
  is_default: z.boolean().default(false)
})