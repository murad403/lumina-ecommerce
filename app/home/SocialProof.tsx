import { Quote, Star } from 'lucide-react'
import React from 'react'

const SocialProof = () => {
    return (
        <section className="py-24 bg-card/30 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <Quote className="w-12 h-12 text-primary/20 mx-auto mb-8" />
                    <div className="space-y-12">
                        <div className="animate-in fade-in duration-1000">
                            <div className="flex justify-center gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                                ))}
                            </div>
                            <p className="text-2xl md:text-4xl font-serif leading-relaxed italic mb-8">
                                "The attention to detail in the Onyx Carry-on is unparalleled. It's not just luggage; it's an
                                architectural statement that makes travel effortless."
                            </p>
                            <div>
                                <h4 className="font-bold uppercase tracking-widest text-xs">Alexander v.</h4>
                                <p className="text-muted-foreground text-[10px] mt-1">Verified Patron — Zurich, CH</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SocialProof
