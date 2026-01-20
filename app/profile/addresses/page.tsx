"use client"
import { Button } from "@/components/ui/button"
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react"


export default function AddressesPage() {
  const user = {
    addresses: [
      {
        id: "addr1",
        name: "Home",
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        country: "USA",
        isDefault: true,
      },
      {
        id: "addr2",
        name: "Home",
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        country: "USA",
        isDefault: true,
      },
      {
        id: "addr3",
        name: "Home",
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        country: "USA",
        isDefault: true,
      },
    ]
  }

  return (
    <div className="lg:col-span-3">
      <div className="bg-card/30 rounded-3xl p-8 border border-white/5">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold uppercase tracking-widest">Your Addresses</h3>
          <Button className="rounded-full gap-2">
            <Plus className="w-4 h-4" /> Add New
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user?.addresses.map((address) => (
            <div
              key={address.id}
              className="p-6 rounded-2xl bg-background/50 border border-white/5 relative group"
            >
              {address.isDefault && (
                <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest font-bold text-primary">
                  Default
                </span>
              )}
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-bold mb-2">{address.name}</p>
                  <p className="text-sm text-muted-foreground">{address.street}</p>
                  <p className="text-sm text-muted-foreground">
                    {address.city}, {address.state} {address.zip}
                  </p>
                  <p className="text-sm text-muted-foreground">{address.country}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                {!address.isDefault && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full flex-1 gap-2 bg-transparent text-xs"
                  >
                    Set Default
                  </Button>
                )}
                <Button size="sm" variant="outline" className="rounded-full flex-1 gap-2 bg-transparent">
                  <Pencil className="w-3 h-3" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full gap-2 text-red-400 border-red-400/20 bg-transparent"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
