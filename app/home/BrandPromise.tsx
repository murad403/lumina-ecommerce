import { Award, Globe, Zap } from 'lucide-react'
import React from 'react'

const BrandPromise = () => {
    return (
        <section className="py-24 bg-primary/5 border-y border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-16 text-center">
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Award className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-serif italic">Uncompromising Quality</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            We partner only with the world's most prestigious artisans to ensure every stitch and component meets
                            our exacting standards.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Zap className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-serif italic">Direct Access</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            By eliminating the traditional retail markup, we bring you world-class luxury at a value that remains
                            unmatched in the industry.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Globe className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-serif italic">Global Presence</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Operating from the fashion capitals of the world, we ship to over 120 countries with dedicated
                            white-glove logistics.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BrandPromise
