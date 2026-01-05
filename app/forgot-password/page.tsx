"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Mail, CheckCircle, Phone, KeyRound } from "lucide-react"
import Link from "next/link"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/footer"

export default function ForgotPasswordPage() {
  const [contact, setContact] = useState("")
  const [step, setStep] = useState<"initial" | "otp" | "reset" | "success">("initial")
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (step === "initial") {
      setTimeout(() => {
        setIsLoading(false)
        setStep("otp")
        toast({
          title: "Signature Dispatched",
          description: `A verification code has been sent to your ${authMethod === "email" ? "registered email" : "personal device"}.`,
        })
      }, 1500)
    } else if (step === "otp") {
      setTimeout(() => {
        setIsLoading(false)
        setStep("reset")
      }, 1500)
    } else if (step === "reset") {
      setTimeout(() => {
        setIsLoading(false)
        setStep("success")
        toast({
          title: "Identity Secured",
          description: "Your architectural credentials have been updated.",
        })
      }, 1500)
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">

      <div className="flex-1 flex items-center justify-center px-4 pt-24 pb-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-primary/5 blur-[120px] rounded-full -z-10" />
        <div className="w-full max-w-md">
          {step !== "success" && (
            <button
              onClick={() => {
                if (step === "otp") setStep("initial")
                else if (step === "reset") setStep("otp")
                else router.push("/auth")
              }}
              className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground mb-10 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              {step === "initial" ? "Return to Sanctuary" : "Previous Step"}
            </button>
          )}

          <div className="bg-card/40 backdrop-blur-2xl p-12 rounded-[2.5rem] border border-white/5 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {step === "initial" && (
              <>
                <div className="text-center mb-12">
                  <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8 animate-pulse">
                    <KeyRound className="w-10 h-10 text-primary" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.5em] text-primary font-bold mb-4 block italic">
                    Restoration
                  </span>
                  <h1 className="text-4xl font-serif italic mb-4">Credentials</h1>
                  <p className="text-muted-foreground text-sm leading-relaxed px-6">
                    Select your preferred method for identity restoration.
                  </p>
                </div>

                <div className="flex gap-2 mb-8 p-1 bg-white/5 rounded-full border border-white/5">
                  <button
                    onClick={() => setAuthMethod("email")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-medium transition-all ${
                      authMethod === "email"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Mail className="w-3 h-3" /> Email
                  </button>
                  <button
                    onClick={() => setAuthMethod("phone")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-medium transition-all ${
                      authMethod === "phone"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Phone className="w-3 h-3" /> Phone
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      {authMethod === "email" ? "Email Address" : "Phone Number"}
                    </label>
                    <Input
                      type={authMethod === "email" ? "email" : "tel"}
                      className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                      placeholder={authMethod === "email" ? "name@example.com" : "+1 (555) 000-0000"}
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full h-12 rounded-full font-medium" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Code"}
                  </Button>
                </form>
              </>
            )}

            {step === "otp" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center mb-10">
                  <h1 className="text-3xl font-serif mb-2">Verify Code</h1>
                  <p className="text-muted-foreground text-sm">Enter the 6-digit code sent to {contact}</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-8">
                  <InputOTP maxLength={6} value={otp} onChange={(val) => setOtp(val)}>
                    <div className="flex gap-2">
                      <InputOTPGroup className="gap-2">
                        <InputOTPSlot
                          index={0}
                          className="w-12 h-14 rounded-xl border-white/10 bg-background text-lg"
                        />
                        <InputOTPSlot
                          index={1}
                          className="w-12 h-14 rounded-xl border-white/10 bg-background text-lg"
                        />
                        <InputOTPSlot
                          index={2}
                          className="w-12 h-14 rounded-xl border-white/10 bg-background text-lg"
                        />
                      </InputOTPGroup>
                      <InputOTPSeparator className="text-white/20" />
                      <InputOTPGroup className="gap-2">
                        <InputOTPSlot
                          index={3}
                          className="w-12 h-14 rounded-xl border-white/10 bg-background text-lg"
                        />
                        <InputOTPSlot
                          index={4}
                          className="w-12 h-14 rounded-xl border-white/10 bg-background text-lg"
                        />
                        <InputOTPSlot
                          index={5}
                          className="w-12 h-14 rounded-xl border-white/10 bg-background text-lg"
                        />
                      </InputOTPGroup>
                    </div>
                  </InputOTP>
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-full font-medium"
                    disabled={isLoading || otp.length < 6}
                  >
                    {isLoading ? "Verifying..." : "Verify Code"}
                  </Button>
                </form>
              </div>
            )}

            {step === "reset" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center mb-10">
                  <h1 className="text-3xl font-serif mb-2">New Password</h1>
                  <p className="text-muted-foreground text-sm">Create a secure new password for your account.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      New Password
                    </label>
                    <Input
                      type="password"
                      className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full h-12 rounded-full font-medium" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Reset Password"}
                  </Button>
                </form>
              </div>
            )}

            {step === "success" && (
              <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h2 className="text-2xl font-serif mb-4">Password Updated</h2>
                <p className="text-muted-foreground text-sm mb-8">
                  Your password has been successfully reset. You can now sign in with your new password.
                </p>
                <Link href="/auth">
                  <Button className="w-full h-12 rounded-full">Sign In Now</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
