"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Phone, Mail, ArrowLeft } from "lucide-react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Footer } from "@/components/footer"
// <CHANGE> Import useAuth hook for authentication
import { useAuth } from "@/hooks/use-auth"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email")
  const [step, setStep] = useState<"initial" | "otp">("initial")
  const [contact, setContact] = useState("")
  const [name, setName] = useState("")
  const [otp, setOtp] = useState("")

  const router = useRouter()
  const { toast } = useToast()
  // <CHANGE> Get login function from auth hook
  const login = useAuth((state) => state.login)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (step === "initial") {
      // Simulate sending OTP
      setTimeout(() => {
        setIsLoading(false)
        setStep("otp")
        toast({
          title: "Verification Required",
          description: `An authentication code has been dispatched to your ${authMethod === "email" ? "email" : "device"}.`,
        })
      }, 1500)
    } else {
      // <CHANGE> After OTP verification, log in the user
      setTimeout(() => {
        setIsLoading(false)
        
        // Login with the collected information
        const email = authMethod === "email" ? contact : `${contact}@phone.local`
        const phone = authMethod === "phone" ? contact : ""
        login(email, phone, name || "User")
        
        toast({
          title: isLogin ? "Welcome Back" : "Welcome to the Inner Circle",
          description: "Your architectural journey continues.",
        })
        router.push("/profile")
      }, 1500)
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 pt-24 pb-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-primary/5 blur-[120px] rounded-full -z-10" />
        <div className="w-full max-w-md bg-card/40 backdrop-blur-2xl p-12 rounded-[2.5rem] border border-white/5 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {step === "otp" && (
            <button
              onClick={() => {
                setStep("initial")
                setOtp("")
              }}
              className="mb-8 flex items-center text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-3 h-3 mr-2" /> Back to Identity
            </button>
          )}

          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.5em] text-primary font-bold mb-4 block italic">
              Identity
            </span>
            <h1 className="text-4xl font-serif italic mb-4">
              {step === "initial" ? (isLogin ? "Welcome Back" : "Inner Circle") : "Verify Selection"}
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed px-6">
              {step === "initial"
                ? isLogin
                  ? "Access your architectural sanctuary"
                  : "Curating a life of intentionality begins here"
                : `A unique 6-digit signature has been sent to ${contact || (authMethod === "email" ? "your email" : "your phone")}`}
            </p>
          </div>

          {step === "initial" && (
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
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === "initial" ? (
              <>
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      Full Name
                    </label>
                    <Input
                      className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                      placeholder="John Doe"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    {authMethod === "email" ? "Email Address" : "Phone Number"}
                  </label>
                  <Input
                    className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                    placeholder={authMethod === "email" ? "name@example.com" : "+1 (555) 000-0000"}
                    required
                    type={authMethod === "email" ? "email" : "tel"}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Password
                    </label>
                    {isLogin && (
                      <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                        Forgot?
                      </Link>
                    )}
                  </div>
                  <Input
                    type="password"
                    className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center space-y-6">
                <InputOTP maxLength={6} value={otp} onChange={(val) => setOtp(val)} className="flex gap-2">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-10 h-12 rounded-lg border-white/10 bg-background" />
                    <InputOTPSlot index={1} className="w-10 h-12 rounded-lg border-white/10 bg-background" />
                    <InputOTPSlot index={2} className="w-10 h-12 rounded-lg border-white/10 bg-background" />
                  </InputOTPGroup>
                  <div className="flex items-center justify-center text-white/20">-</div>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} className="w-10 h-12 rounded-lg border-white/10 bg-background" />
                    <InputOTPSlot index={4} className="w-10 h-12 rounded-lg border-white/10 bg-background" />
                    <InputOTPSlot index={5} className="w-10 h-12 rounded-lg border-white/10 bg-background" />
                  </InputOTPGroup>
                </InputOTP>
                <p className="text-xs text-muted-foreground">
                  Didn't receive the code?{" "}
                  <button type="button" className="text-primary hover:underline">
                    Resend
                  </button>
                </p>
              </div>
            )}

            <Button
              className="w-full h-12 rounded-full font-medium"
              disabled={isLoading || (step === "otp" && otp.length < 6)}
            >
              {isLoading
                ? "Processing..."
                : step === "otp"
                  ? "Verify & Continue"
                  : isLogin
                    ? "Sign In"
                    : "Create Account"}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setStep("initial")
                }}
                className="text-primary font-medium hover:underline focus:outline-none"
              >
                {isLogin ? "Create one" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
