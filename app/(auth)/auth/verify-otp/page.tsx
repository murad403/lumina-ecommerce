"use client"
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { ArrowLeft } from 'lucide-react'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { verifyOtpValidation } from '@/validation/validation'
import Link from 'next/link'

type VerifyOtpInputs = z.infer<typeof verifyOtpValidation>

const VerifyOtp = () => {
    const [otp, setOtp] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const { handleSubmit } = useForm<VerifyOtpInputs>({
        resolver: zodResolver(verifyOtpValidation)
    })

    const onSubmit: SubmitHandler<VerifyOtpInputs> = (data) => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            console.log("OTP data:", { otp })
        }, 1500)
    }

    return (
        <main className="bg-background flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-12 relative overflow-hidden">
                <div className="flex w-full max-w-md">
                    <Link href={"/auth/forgot-password"}
                        className="mb-8 flex items-center uppercase text-[10px] tracking-widest text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-3 h-3 mr-2" /> Previous Step
                    </Link>
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
                            <div className="flex flex-col items-center space-y-6">
                                <InputOTP maxLength={6} value={otp} onChange={(val) => setOtp(val)} className="flex gap-6">
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} className="size-12 mr-4 rounded-lg border-white/10 bg-background" />
                                        <InputOTPSlot index={1} className="size-12 mr-4 rounded-lg border-white/10 bg-background" />
                                        <InputOTPSlot index={2} className="size-12 rounded-lg border-white/10 bg-background" />
                                    </InputOTPGroup>
                                    <div className="flex items-center justify-center text-white/20">-</div>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} className="size-12 mr-4 rounded-lg border-white/10 bg-background" />
                                        <InputOTPSlot index={4} className="size-12 mr-4 rounded-lg border-white/10 bg-background" />
                                        <InputOTPSlot index={5} className="size-12 rounded-lg border-white/10 bg-background" />
                                    </InputOTPGroup>
                                </InputOTP>
                                <p className="text-xs text-muted-foreground">
                                    Didn't receive the code?{" "}
                                    <button type="button" className="text-primary hover:underline">
                                        Resend
                                    </button>
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit(onSubmit)}
                                className="w-full h-12 rounded-full font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                                disabled={isLoading || otp.length < 6}
                            >
                                {isLoading ? "Verifying..." : "Verify Code"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default VerifyOtp