"use client"
import { Button } from "@/components/ui/button"
import { useViewOrderHistoryQuery } from "@/redux/features/user/orderTracking.api"
import { TProfileOrderHistory } from "@/types/profile"
import { Package, Eye } from "lucide-react"
import Link from "next/link"

const OrdersPage = () => {
  const { data } = useViewOrderHistoryQuery(undefined);
  // console.log(data?.data)
  return (
    <div className="lg:col-span-3">
      <div className="bg-card/30 rounded-3xl p-8 border border-white/5">
        <h3 className="text-lg font-bold uppercase tracking-widest mb-8">Order History</h3>
        <div className="space-y-4">
          {
            data?.data?.map((order: TProfileOrderHistory) => (
              <div
                key={order?.id}
                className="flex items-center justify-between p-6 rounded-2xl bg-background/50 border border-white/5 hover:border-primary/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-card border border-white/5 flex items-center justify-center">
                    <Package className="w-7 h-7 text-primary/50" />
                  </div>
                  <div>
                    <p className="font-bold mb-1">Order #{order?.order_number}</p>
                    <p className="text-xs text-muted-foreground mb-1">{new Date(order?.created_at).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}</p>
                    <p className="text-xs text-muted-foreground">{order?.items_count} item(s)</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-bold mb-1">${order?.total_amount}</p>
                    <p
                      className={`text-[10px] uppercase tracking-widest font-bold ${order?.status === "delivered" ? "text-green-400" : "text-primary"
                        }`}
                    >
                      {order?.status_display}
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