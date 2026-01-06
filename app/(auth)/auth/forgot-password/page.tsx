"use client"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, Eye, EyeOff, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { ForgotPasswordValidation, signinValidation } from "@/validation/validation"

type ForgotPasswordInputs = z.infer<typeof ForgotPasswordValidation>

const ForgotPassword = () => {
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("phone")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordInputs>({
    resolver: zodResolver(ForgotPasswordValidation)
  })

  const onSubmit: SubmitHandler<ForgotPasswordInputs> = (data) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      console.log("Signin data:", data)
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">

      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-12 relative overflow-hidden">
        <div className="flex w-full max-w-md">
          <button
            className="mb-8 flex items-center text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3 h-3 mr-2" /> Back to Identity
          </button>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-primary/5 blur-[120px] rounded-full -z-10" />

        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-1000">

          <div className="text-center mb-12 ">
            <span className="text-[10px] uppercase tracking-[0.5em] text-primary font-bold mb-4 italic border border-primary inline-block rounded-full p-2">
              Restoration
            </span>
            <h1 className="text-4xl font-serif italic mb-4">Credentials</h1>
            <p className="text-muted-foreground text-sm leading-relaxed px-6">
              Select your preferred method for identity restoration.
            </p>
          </div>

          <div className="bg-card p-12 border-white/5 border rounded-[2.5rem] backdrop-blur-2xl">
            {/* Email/Phone Toggle */}
            <div className="flex gap-2 mb-8 p-1 bg-background rounded-full border border-white/10">
              <button
                onClick={() => setAuthMethod("email")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-medium transition-all ${authMethod === "email"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground bg-white/10"
                  }`}
              >
                <Mail className="w-3 h-3" /> Email
              </button>
              <button
                onClick={() => setAuthMethod("phone")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-medium transition-all ${authMethod === "phone"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground bg-white/10"
                  }`}
              >
                <Phone className="w-3 h-3" /> Phone
              </button>
            </div>

            <div className="space-y-6">
              {/* Email/Phone */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  {authMethod === "email" ? "Email Address" : "Phone Number"}
                </label>
                <Input
                  className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                  placeholder={authMethod === "email" ? "name@example.com" : "+1 (555) 000-0000"}
                  type={authMethod === "email" ? "email" : "tel"}
                  {...register("contact")}
                />
                {errors.contact && <p className="text-red-500 text-xs ml-1">{errors.contact.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit(onSubmit)}
                className="w-full h-12 rounded-full font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Code"}
              </button>

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ForgotPassword