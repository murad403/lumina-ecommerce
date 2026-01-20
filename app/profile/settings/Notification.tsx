"use client"
import { Button } from '@/components/ui/button'
import { Bell, Mail } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { notificationsSchema } from '@/validation/validation'


type NotificationsFormData = z.infer<typeof notificationsSchema>

const Notifications = () => {
    const {
        control,
        handleSubmit,
        formState: { isDirty },
    } = useForm<NotificationsFormData>({
        resolver: zodResolver(notificationsSchema),
        defaultValues: {
            orderUpdates: true,
            promotions: true,
        },
    })

    const onSubmit = (data: NotificationsFormData) => {
        console.log("Notification preferences saved:", data)
        // Handle save logic here
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-card/30 rounded-3xl p-8 border border-white/5">
            <div className="flex items-center gap-3 mb-8">
                <Bell className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold uppercase tracking-widest">Notifications</h3>
            </div>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-white/5">
                    <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div>
                            <p className="font-medium">Order Updates</p>
                            <p className="text-xs text-muted-foreground">Receive email updates about your orders</p>
                        </div>
                    </div>
                    <Controller
                        name="orderUpdates"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="w-5 h-5 rounded accent-primary cursor-pointer"
                            />
                        )}
                    />
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-white/5">
                    <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div>
                            <p className="font-medium">Promotions & Offers</p>
                            <p className="text-xs text-muted-foreground">Exclusive deals and new arrivals</p>
                        </div>
                    </div>
                    <Controller
                        name="promotions"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="w-5 h-5 rounded accent-primary cursor-pointer"
                            />
                        )}
                    />
                </div>
            </div>
            {isDirty && (
                <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <Button type="submit" className="rounded-full">
                        Save Preferences
                    </Button>
                </div>
            )}
        </form>
    )
}

export default Notifications