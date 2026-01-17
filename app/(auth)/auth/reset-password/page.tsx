"use client"
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { resetPasswordValidation } from '@/validation/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import z from 'zod'
import { Input } from '@/components/ui/input'
import { useResetPasswordMutation } from '@/redux/features/auth/auth.api'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { setSignUpUser, setUserOtp } from '@/redux/features/auth/authSlice'

type ResetPasswordInputs = z.infer<typeof resetPasswordValidation>

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const router = useRouter();
    const {user, otp} = useAppSelector((state: any) => state.auth);
    const dispatch = useAppDispatch();

    const { handleSubmit, register, formState: { errors } } = useForm<ResetPasswordInputs>({
        resolver: zodResolver(resetPasswordValidation)
    })

    const onSubmit: SubmitHandler<ResetPasswordInputs> = async (data) => {
        try {
            const result = await resetPassword({ ...data, email: user?.email, otp: otp?.otp }).unwrap();
            toast.success(result?.message || "Password reset successfully!");
            router.push('/auth/sign-in');
            dispatch(setUserOtp({otp: null}), setSignUpUser({ email: null, id: null }));
        } catch (error: any) {
            toast.error(error?.data?.message || "Something went wrong. Please try again.");
        }
    }
    return (
        <main className="bg-background flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-12 relative overflow-hidden">
                <div className="flex w-full max-w-md">
                    <button onClick={() => router.back()}
                        className="mb-8 flex items-center text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-3 h-3 mr-2" /> Previous Step
                    </button>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-primary/5 blur-[120px] rounded-full -z-10" />

                <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="text-center mb-12 ">
                        <h1 className="text-4xl font-serif italic mb-4">Verify Code</h1>
                        <p className="text-muted-foreground text-sm leading-relaxed px-6">
                            Enter the 6-digit code sent to mdmurad@gmail.com
                        </p>
                    </div>

                    <div className="bg-card p-12 border-white/5 border rounded-[2.5rem] backdrop-blur-2xl">
                        <div className="space-y-6">

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                                    New Password
                                </label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                                        placeholder="••••••••"
                                        {...register("new_password")}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-4 flex items-center text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </button>
                                </div>
                                {errors.new_password && <p className="text-red-500 text-xs ml-1">{errors.new_password.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                                        placeholder="••••••••"
                                        {...register("confirm_password")}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-4 flex items-center text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </button>
                                </div>
                                {errors.confirm_password && <p className="text-red-500 text-xs ml-1">{errors.confirm_password.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit(onSubmit)}
                                className="w-full h-12 rounded-full font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : "Reset Password"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ResetPassword
