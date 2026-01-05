"use client"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState, Suspense } from "react"

const faqs = [
  {
    category: "Logistics",
    question: "How long does global shipping take?",
    answer:
      "Standard shipping typically takes 5-7 business days. Express white-glove shipping is available for 1-3 business day delivery in fashion capitals. International orders may take 10-14 business days depending on location.",
  },
  {
    category: "Concierge",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day hassle-free return policy. If you're not completely satisfied with your purchase, you can return it for a full refund or exchange, provided the item is in its original architectural condition.",
  },
  {
    category: "Logistics",
    question: "Do you ship to my country?",
    answer:
      "Yes, LUMINA ships to over 120 countries worldwide. Shipping costs and delivery times vary by destination and are calculated at checkout.",
  },
  {
    category: "Concierge",
    question: "Are your products covered by warranty?",
    answer:
      "Yes, all LUMINA products come with a 2-year limited warranty against manufacturing defects. Our timepieces carry a 5-year extended warranty for peace of mind.",
  },
]

function FAQContent() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="pt-32 pb-24 container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <span className="text-xs uppercase tracking-[0.5em] text-primary font-bold mb-6 block">Support</span>
          <h1 className="text-6xl md:text-8xl font-serif mb-12 italic text-balance">
            How Can We <span className="not-italic text-foreground">Assist You?</span>
          </h1>
          <div className="relative max-w-xl mx-auto group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search our knowledge base..."
              className="w-full h-16 pl-16 pr-6 rounded-full bg-card/50 border-white/5 focus:border-primary transition-all text-lg"
            />
          </div>
        </div>

        <div className="bg-card/20 rounded-[2.5rem] p-8 md:p-12 border border-white/5 backdrop-blur-md animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-white/5 last:border-0 py-6"
                >
                  <AccordionTrigger className="text-xl md:text-2xl font-serif italic hover:text-primary transition-all text-left leading-tight group">
                    <span className="flex items-center gap-4">
                      <span className="text-[10px] not-italic uppercase tracking-widest text-primary/50 group-hover:text-primary">
                        {faq.category}
                      </span>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-lg leading-relaxed pt-6 pl-0 md:pl-28">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
              </div>
            )}
          </Accordion>
        </div>

        <div className="mt-20 text-center animate-in fade-in duration-1000 delay-500">
          <div className="bg-primary/5 rounded-3xl p-10 border border-primary/10 inline-block max-w-lg">
            <MessageSquare className="w-10 h-10 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-serif italic mb-4">Still Have Questions?</h3>
            <p className="text-muted-foreground mb-8">
              If you couldn't find what you're looking for, our concierge team is always available to help.
            </p>
            <a href="/contact">
              <Button className="rounded-full px-10 py-6 h-auto">Contact Concierge</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-background">

      <Suspense fallback={null}>
        <FAQContent />
      </Suspense>

    </main>
  )
}
