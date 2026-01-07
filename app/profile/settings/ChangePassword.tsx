import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { changePasswordSchema } from '@/validation/validation'


type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

const ChangePassword = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    const onSubmit = (data: ChangePasswordFormData) => {
        console.log("Password change data:", data)
        // Handle password update logic here
        reset() // Reset form after successful submission
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-card/30 rounded-3xl p-8 border border-white/5">
            <div className="flex items-center gap-3 mb-8">
                <Lock className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold uppercase tracking-widest">Change Password</h3>
            </div>
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        Current Password
                    </label>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        {...register("currentPassword")}
                        className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                    />
                    {errors.currentPassword && (
                        <p className="text-xs text-red-500 mt-1 ml-4">{errors.currentPassword.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        New Password
                    </label>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        {...register("newPassword")}
                        className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                    />
                    {errors.newPassword && (
                        <p className="text-xs text-red-500 mt-1 ml-4">{errors.newPassword.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        Confirm New Password
                    </label>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        {...register("confirmPassword")}
                        className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                    />
                    {errors.confirmPassword && (
                        <p className="text-xs text-red-500 mt-1 ml-4">{errors.confirmPassword.message}</p>
                    )}
                </div>
                <Button type="submit" className="rounded-full">Update Password</Button>
            </div>
        </form>
    )
}

export default ChangePassword