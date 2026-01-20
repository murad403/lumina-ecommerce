"use client"
import { Button } from "@/components/ui/button"
import { useViewOrderHistoryQuery } from "@/redux/features/user/orderTracking.api"
import { useGetShippingAddressesQuery } from "@/redux/features/user/shippingAddress.api"
import { useAppSelector } from "@/redux/hooks"
import { TProfileOrderHistory, TShippingAddress } from "@/types/profile"
import { Package, MapPin } from "lucide-react"
import Link from "next/link"

const ProfilePage = () => {
  const { currentUser } = useAppSelector((state: any) => state?.auth);
  const { data: shippingAddresses } = useGetShippingAddressesQuery(undefined);
  const defaultAddress: TShippingAddress = shippingAddresses?.data?.find((address: any) => address.is_default);
  const { data: orderHistory } = useViewOrderHistoryQuery(undefined);
  // console.log(orderHistory?.data);

  return (
    <main className="min-h-screen bg-background space-y-6">
      <section className="bg-card/30 rounded-3xl p-8 border border-white/5 space-y-8">
        <div>
          <h3 className="text-lg font-bold uppercase tracking-widest mb-6">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-2 block">
                Full Name
              </label>
              <p className="font-medium">{currentUser?.profile?.full_name}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-2 block">
                Email Address
              </label>
              <p className="font-medium">{currentUser?.profile?.email}</p>
            </div>
            {currentUser?.profile?.phone && (
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-2 block">
                  Phone Number
                </label>
                <p className="font-medium">{currentUser?.profile?.phone}</p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-white/5">
          <h3 className="text-lg font-bold uppercase tracking-widest mb-6">Default Shipping</h3>
          {defaultAddress ? (
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-medium">{defaultAddress?.label}</p>
                <p className="text-sm text-muted-foreground">{defaultAddress?.address}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No default address set</p>
          )}
        </div>
      </section>

      <section className="bg-card/30 rounded-3xl p-8 border border-white/5">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold uppercase tracking-widest">Recent Orders</h3>
          <Link href="/profile/orders">
            <Button variant="link" className="text-primary text-xs font-bold p-0">
              View All
            </Button>
          </Link>
        </div>
        <div className="space-y-4">
          {
            orderHistory?.data?.length === 0 ? (
              <p className="text-sm text-muted-foreground">You have no recent orders.</p>
            ) : (
              orderHistory?.data?.slice(0, 3).map((order: TProfileOrderHistory) =>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-card border border-white/5 flex items-center justify-center">
                      <Package className="w-6 h-6 text-primary/50" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Order #{order.order_number}</p>
                      <p className="text-xs text-muted-foreground">Placed on {new Date(order.created_at).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">${order.total_amount}</p>
                    <p className="text-[10px] uppercase tracking-widest text-primary font-bold">{order?.status}</p>
                  </div>
                </div>
              )
            )
          }
        </div>
      </section>
    </main>
  )
}


export default ProfilePage;