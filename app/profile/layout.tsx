import ProfileHeader from '@/components/ProfileHeader'
import ProfileSidebar from '@/components/ProfileSidebar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    
    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 pt-32 pb-24">
                <div className="max-w-5xl mx-auto">
                    <ProfileHeader></ProfileHeader>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar Nav */}
                        <ProfileSidebar></ProfileSidebar>

                        {/* Content Area */}
                        <div className="lg:col-span-3 space-y-8">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default layout
