"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Instagram, Facebook, Twitter, ArrowRight } from "lucide-react"
import { contactValidation } from "@/validation/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"

type ContactInputs = z.infer<typeof contactValidation>

const ContactPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<ContactInputs>({
    resolver: zodResolver(contactValidation)
  })



  const onSubmit: SubmitHandler<ContactInputs> = (data) => {
    console.log(data)
  }



  return (
    <main className="min-h-screen bg-background">

      <div className="pt-32 pb-24 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">

            {/* contact page details */}
            <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
              <span className="text-xs uppercase tracking-[0.5em] text-primary font-bold mb-6 block">Concierge</span>
              <h1 className="text-6xl md:text-8xl font-serif mb-8 italic">
                Get in <span className="not-italic text-foreground">Touch</span>
              </h1>
              <p className="text-muted-foreground text-xl mb-12 max-w-md leading-relaxed">
                Whether you have a question about our collections or require assistance with a bespoke order, our team
                is here to provide an exceptional experience.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-primary italic">Email</h3>
                  <p className="text-lg font-serif">concierge@lumina.com</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-primary italic">Phone</h3>
                  <p className="text-lg font-serif">+1 (888) 555-0123</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-primary italic">Atelier</h3>
                  <p className="text-lg font-serif">721 Fifth Avenue, New York</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-primary italic">Social</h3>
                  <div className="flex gap-4">
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* contact page form */}
            <div className="bg-card/50 p-10 md:p-16 rounded-[2.5rem] border border-white/5 backdrop-blur-xl animate-in fade-in slide-in-from-right-8 duration-1000">
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground ml-1">
                      First Name
                    </label>
                    <Input
                      placeholder="John"
                      className="rounded-full bg-background/50 border-white/5 h-14 px-6 focus:border-primary transition-all"
                      {...register("first_name")}
                    />
                    {errors.first_name && <p className="text-red-500 text-xs ml-1">{errors.first_name.message}</p>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground ml-1">
                      Last Name
                    </label>
                    <Input
                      placeholder="Doe"
                      className="rounded-full bg-background/50 border-white/5 h-14 px-6 focus:border-primary transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground ml-1">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="rounded-full bg-background/50 border-white/5 h-14 px-6 focus:border-primary transition-all"
                    {...register("email")}
                  />
                  {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email.message}</p>}
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground ml-1">
                    Your Message
                  </label>
                  <Textarea
                    {...register("message")}
                    placeholder="Tell us about your requirements..."
                    className="min-h-45 rounded-4xl bg-background/50 border-white/5 p-6 focus:border-primary transition-all resize-none"
                    required
                  />
                  {errors.message && <p className="text-red-500 text-xs ml-1">{errors.message.message}</p>}
                </div>
                <Button onClick={handleSubmit(onSubmit)} type="submit" className="w-full rounded-full py-8 text-lg group">
                  Send Inquiry <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}


export default ContactPage;