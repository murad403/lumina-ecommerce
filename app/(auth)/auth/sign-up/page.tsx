"use client"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, Mail, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { signupValidation } from "@/validation/validation"
import Link from "next/link"

type SignupInputs = z.infer<typeof signupValidation>

const SignUp = () => {
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<SignupInputs>({
    resolver: zodResolver(signupValidation)
  })

  const onSubmit: SubmitHandler<SignupInputs> = (data) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      console.log("Signup data:", data)
    }, 1500)
  }

  return (
    <main className="bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 pt-24 pb-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-primary/5 blur-[120px] rounded-full -z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000" />

        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-1000">

          <div className="text-center mb-12 ">
            <span className="text-[10px] uppercase tracking-[0.5em] text-primary font-bold mb-4 italic border border-primary inline-block rounded-full p-2">
              Identity
            </span>
            <h1 className="text-4xl font-serif italic mb-4">Inner Circle</h1>
            <p className="text-muted-foreground text-sm leading-relaxed px-6">
              Curating a life of intentionality begins here
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
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Full Name
                </label>
                <Input
                  className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                  placeholder="John Doe"
                  {...register("name")}
                />
                {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name.message}</p>}
              </div>

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

              {/* Password */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                    placeholder="••••••••"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs ml-1">{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs ml-1">{errors.confirmPassword.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit(onSubmit)}
                className="w-full h-12 rounded-full font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Create Account"}
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href={"/auth/sign-in"} className="text-primary font-medium hover:underline focus:outline-none">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignUp