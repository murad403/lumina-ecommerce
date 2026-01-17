"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft } from "lucide-react"
import { IoKeyOutline } from "react-icons/io5"
import { Input } from "@/components/ui/input"
import { ForgotPasswordValidation } from "@/validation/validation"
import { useForgotPasswordMutation } from "@/redux/features/auth/auth.api"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setSignUpUser } from "@/redux/features/auth/authSlice"

type ForgotPasswordInputs = z.infer<typeof ForgotPasswordValidation>

const ForgotPassword = () => {
  const [forgotPassword, {isLoading}] = useForgotPasswordMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.auth?.user);

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordInputs>({
    resolver: zodResolver(ForgotPasswordValidation)
  })

  const onSubmit: SubmitHandler<ForgotPasswordInputs> = async(data) => {
    try {
      dispatch(setSignUpUser({ email: data.email, id: null }));
      const result = await forgotPassword(data).unwrap();
      toast.success(result?.message || "OTP sent to your email.");
      router.push("/auth/reset-password-verify-otp");
    } catch (error: any) {
      // console.log(error);
      toast.error(error?.data?.message || "Failed to send OTP. Please try again.");
    }
  }

  return (
    <main className=" bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-12 relative overflow-hidden">
        <div className="flex w-full max-w-md">
          <button
            className="mb-8 flex items-center text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-3 h-3 mr-2" /> Back to Identity
          </button>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-primary/5 blur-[120px] rounded-full -z-10" />

        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-1000">

          <div className="flex justify-center mb-6">
            <div className="text-primary inline-block p-5 rounded-full bg-primary/20 animate-pulse">
              <IoKeyOutline size={30} />
            </div>
          </div>

          <div className="text-center mb-12 ">
            <span className="text-[10px] uppercase tracking-[0.5em] text-primary font-bold mb-4 italic border border-primary inline-block rounded-full p-2">
              Restoration
            </span>
            <h1 className="text-4xl font-serif italic mb-4">Credentials</h1>
            <p className="text-muted-foreground text-sm leading-relaxed px-6">
              Enter your email to restore your identity.
            </p>
          </div>

          <div className="bg-card p-12 border-white/5 border rounded-[2.5rem] backdrop-blur-2xl">

            <div className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Email Address
                </label>
                <Input
                  className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                  placeholder="name@example.com"
                  type="email"
                  {...register("email")}
                />
                {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email.message}</p>}
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