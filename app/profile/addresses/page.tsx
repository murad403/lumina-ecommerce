"use client"
import { Button } from "@/components/ui/button"
import { AddressDialog } from "@/components/address-dialog"
import { useGetShippingAddressesQuery, useSetDefaultAddressMutation, useAddShippingAddressMutation, useUpdateShippingAddressMutation, useRemoveShippingAddressMutation } from "@/redux/features/user/shippingAddress.api"
import { TShippingAddress } from "@/types/profile"
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react"
import { toast } from "react-toastify"
import { useState } from "react"


export default function AddressesPage() {
  const { data } = useGetShippingAddressesQuery(undefined);
  const [setDefaultAddress] = useSetDefaultAddressMutation();
  const [addAddress, { isLoading: isAdding }] = useAddShippingAddressMutation();
  const [updateAddress, { isLoading: isUpdating }] = useUpdateShippingAddressMutation();
  const [deleteAddress] = useRemoveShippingAddressMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<TShippingAddress | null>(null);

  const handleSetDefaultAddress = async (id: number) => {
    try {
      const result = await setDefaultAddress(id).unwrap();
      toast.success(result?.message || "Default address set successfully.");
    } catch (error) {
      toast.error("Failed to set default address. Please try again.");
    }
  }

  const handleAddAddress = async (data: { label: string; address: string; is_default: boolean }) => {
    try {
      await addAddress(data).unwrap();
      toast.success("Address added successfully!");
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to add address. Please try again.");
    }
  }

  const handleEditAddress = async (data: { label: string; address: string; is_default: boolean }) => {
    if (!editingAddress) return;
    try {
      await updateAddress({ id: editingAddress.id, data }).unwrap();
      toast.success("Address updated successfully!");
      setIsDialogOpen(false);
      setEditingAddress(null);
    } catch (error) {
      toast.error("Failed to update address. Please try again.");
    }
  }

  const handleDeleteAddress = async (id: number) => {
    try {
      await deleteAddress(id).unwrap();
      toast.success("Address deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete address. Please try again.");
    }
  }

  const openAddDialog = () => {
    setEditingAddress(null);
    setIsDialogOpen(true);
  }

  const openEditDialog = (address: TShippingAddress) => {
    setEditingAddress(address);
    setIsDialogOpen(true);
  }

  return (
    <div className="lg:col-span-3">
      <div className="bg-card/30 rounded-3xl p-8 border border-white/5">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold uppercase tracking-widest">Your Addresses</h3>
          <Button onClick={openAddDialog} className="rounded-full gap-2">
            <Plus className="w-4 h-4" /> Add New
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {
            data?.data?.map((address: TShippingAddress) =>
              <div
                key={address?.id}
                className="p-6 rounded-2xl bg-background/50 border border-white/5 relative group"
              >
                {address?.is_default && (
                  <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest font-bold text-primary">
                    Default
                  </span>
                )}
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-bold mb-2">{address?.label}</p>
                    <p className="text-sm text-muted-foreground">{address?.address}</p>
                    {/* <p className="text-sm text-muted-foreground">{address?.address}</p> */}
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                  {!address?.is_default && (
                    <Button
                      onClick={() => handleSetDefaultAddress(address?.id)}
                      size="sm"
                      variant="outline"
                      className="rounded-full flex-1 gap-2 bg-transparent text-xs"
                    >
                      Set Default
                    </Button>
                  )}
                  <Button
                    onClick={() => openEditDialog(address)}
                    size="sm"
                    variant="outline"
                    className="rounded-full flex-1 gap-2 bg-transparent"
                  >
                    <Pencil className="w-3 h-3" /> Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteAddress(address?.id)}
                    size="sm"
                    variant="outline"
                    className="rounded-full gap-2 text-red-400 border-red-400/20 bg-transparent"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )
          }
        </div>
      </div>

      <AddressDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={editingAddress ? handleEditAddress : handleAddAddress}
        initialData={editingAddress ? {
          label: editingAddress.label,
          address: editingAddress.address,
          is_default: editingAddress.is_default
        } : undefined}
        isEdit={!!editingAddress}
        isLoading={isAdding || isUpdating}
      />
    </div>
  )
}
