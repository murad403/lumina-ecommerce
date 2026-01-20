"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { personalInfoSchema } from '@/validation/validation'



type PersonalInfoFormData = z.infer<typeof personalInfoSchema>

const PersonalInformation = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PersonalInfoFormData>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
        },
    })

    const onSubmit = (data: PersonalInfoFormData) => {
        console.log("Personal info saved:", data)
        // Handle save logic here
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-card/30 rounded-3xl p-8 border border-white/5">
            <div className="flex items-center gap-3 mb-8">
                <User className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold uppercase tracking-widest">Personal Information</h3>
            </div>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                            First Name
                        </label>
                        <Input
                            {...register("firstName")}
                            className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                        />
                        {errors.firstName && (
                            <p className="text-xs text-red-500 mt-1 ml-4">{errors.firstName.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                            Last Name
                        </label>
                        <Input
                            {...register("lastName")}
                            className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                        />
                        {errors.lastName && (
                            <p className="text-xs text-red-500 mt-1 ml-4">{errors.lastName.message}</p>
                        )}
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        Email Address
                    </label>
                    <Input
                        type="email"
                        {...register("email")}
                        className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500 mt-1 ml-4">{errors.email.message}</p>
                    )}
                </div>
                <Button type="submit" className="rounded-full">
                    Save Changes
                </Button>
            </div>
        </form>
    )
}

export default PersonalInformation