"use client"
import { Button } from "@/components/ui/button"
import { Package, Eye } from "lucide-react"
import Link from "next/link"

const orders = [
  {
    id: "LMN-82937",
    date: "January 24, 2026",
    status: "Shipped",
    total: 299.0,
    items: 2,
  },
  {
    id: "LMN-81204",
    date: "December 15, 2025",
    status: "Delivered",
    total: 189.0,
    items: 1,
  },
  {
    id: "LMN-79812",
    date: "November 28, 2025",
    status: "Delivered",
    total: 449.0,
    items: 3,
  },
  {
    id: "LMN-77356",
    date: "October 10, 2025",
    status: "Delivered",
    total: 129.0,
    items: 1,
  },
]

const OrdersPage = () => {
  return (
    <div className="lg:col-span-3">
      <div className="bg-card/30 rounded-3xl p-8 border border-white/5">
        <h3 className="text-lg font-bold uppercase tracking-widest mb-8">Order History</h3>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-6 rounded-2xl bg-background/50 border border-white/5 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-card border border-white/5 flex items-center justify-center">
                  <Package className="w-7 h-7 text-primary/50" />
                </div>
                <div>
                  <p className="font-bold mb-1">Order #{order.id}</p>
                  <p className="text-xs text-muted-foreground mb-1">{order.date}</p>
                  <p className="text-xs text-muted-foreground">{order.items} item(s)</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="font-bold mb-1">${order.total.toFixed(2)}</p>
                  <p
                    className={`text-[10px] uppercase tracking-widest font-bold ${order.status === "Delivered" ? "text-green-400" : "text-primary"
                      }`}
                  >
                    {order.status}
                  </p>
                </div>
                <Link href="/track-order">
                  <Button size="sm" variant="outline" className="rounded-full gap-2 bg-transparent">
                    <Eye className="w-4 h-4" /> View
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default OrdersPage;