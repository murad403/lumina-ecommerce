"use client"
import { profileSidebarData, TProfileSidebarItem } from '@/lib/data'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ProfileSidebar = () => {
    const pathName = usePathname();
    return (
        <aside className="lg:col-span-1 space-y-2">
            {
                profileSidebarData?.map((item: TProfileSidebarItem) =>
                    <Link
                        href={item?.href}
                        className={`w-full flex items-center justify-between p-4 rounded-xl font-medium ${pathName === item?.href ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-sidebar-primary-foreground transition-colors duration-300'}`}
                    >
                        <span className="flex items-center gap-3">
                            {item?.icon && <item.icon />} {item?.title}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                )
            }
        </aside>
    )
}

export default ProfileSidebar
