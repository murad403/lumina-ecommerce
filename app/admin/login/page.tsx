"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Lock, User, Store } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const login = useAdminAuth((state) => state.login)
  const { toast } = useToast()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(async () => {
      const success = await login(username, password)

      if (success) {
        toast({
          title: "Welcome Back, Administrator",
          description: "Access granted to the control center.",
        })
        router.push("/admin")
      } else {
        toast({
          title: "Access Denied",
          description: "Invalid credentials. Please verify and try again.",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-primary/5 blur-[120px] rounded-full -z-10" />

      <div className="w-full max-w-md bg-card/40 backdrop-blur-2xl p-12 rounded-[2.5rem] border border-white/5 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center backdrop-blur-sm border border-primary/20">
            <Store className="h-8 w-8 text-primary" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.5em] text-primary font-bold mb-4 block italic">
            Admin Portal
          </span>
          <h1 className="text-4xl font-serif italic mb-4">Control Center</h1>
          <p className="text-muted-foreground text-sm leading-relaxed px-6">
            Administrative access to your luxury commerce platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Username</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-full bg-background border-white/10 pl-12 pr-6 h-12 focus:border-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-full bg-background border-white/10 pl-12 pr-6 h-12 focus:border-primary"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-12 rounded-full font-medium" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Access Dashboard"}
          </Button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-muted-foreground mb-2">Demo Credentials</p>
          <div className="flex items-center justify-center gap-4 text-xs">
            <span className="text-muted-foreground">
              <span className="text-primary font-medium">admin</span> / admin123
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
