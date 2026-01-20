"use client"
import { useRouter } from 'next/navigation';
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import { useAppSelector } from '@/redux/hooks';

const ProfileHeader = () => {
    const { currentUser } = useAppSelector((state: any) => state?.auth);
    const router = useRouter();
    const handleLogout = () => {
        router.push("/")
    }
    return (
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
                <h1 className="text-4xl md:text-5xl font-serif mb-2">My Account</h1>
                <p className="text-muted-foreground">Welcome back, {currentUser?.profile?.full_name}</p>
            </div>
            <Button
                onClick={handleLogout}
                variant="outline"
                className="rounded-full border-white/10 gap-2 w-fit bg-transparent"
            >
                <LogOut className="w-4 h-4" /> Sign Out
            </Button>
        </header>
    )
}

export default ProfileHeader
