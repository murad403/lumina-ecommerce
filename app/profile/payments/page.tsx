"use client"
import { Button } from "@/components/ui/button"
import { CreditCard, Plus, Trash2 } from "lucide-react"

const paymentMethods = [
  {
    id: 1,
    type: "Visa",
    last4: "4242",
    expiry: "12/26",
    isDefault: true,
  },
  {
    id: 2,
    type: "Mastercard",
    last4: "8888",
    expiry: "08/27",
    isDefault: false,
  },
]

export default function PaymentsPage() {
  return (
    <div className="lg:col-span-3">
      <div className="bg-card/30 rounded-3xl p-8 border border-white/5">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold uppercase tracking-widest">Saved Cards</h3>
          <Button className="rounded-full gap-2">
            <Plus className="w-4 h-4" /> Add Card
          </Button>
        </div>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="p-6 rounded-2xl bg-linear-to-br from-primary/10 to-transparent border border-primary/20 relative"
            >
              {method.isDefault && (
                <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest font-bold text-primary">
                  Default
                </span>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-card border border-white/5 flex items-center justify-center">
                    <CreditCard className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold mb-1">
                      {method.type} •••• {method.last4}
                    </p>
                    <p className="text-xs text-muted-foreground">Expires {method.expiry}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full gap-2 text-red-400 border-red-400/20 bg-transparent"
                >
                  <Trash2 className="w-3 h-3" /> Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
