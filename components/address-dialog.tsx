"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useEffect } from "react"
import { addressSchema } from "@/validation/validation"

type AddressFormData = z.infer<typeof addressSchema>

interface AddressDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: AddressFormData) => void
  initialData?: AddressFormData
  isEdit?: boolean
  isLoading?: boolean
}

export function AddressDialog({  open,  onOpenChange,  onSubmit,  initialData, isEdit = false, isLoading = false}: AddressDialogProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: "",
      address: "",
      is_default: false
    }
  })

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    } else {
      reset({
        label: "",
        address: "",
        is_default: false
      })
    }
  }, [initialData, reset, open])

  const handleFormSubmit = (data: AddressFormData) => {
    onSubmit(data)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            {isEdit ? "Edit Address" : "Add New Address"}
          </DialogTitle>
          <DialogDescription>
            {isEdit 
              ? "Update your shipping address details" 
              : "Add a new shipping address to your account"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="label">Address Label</Label>
            <Input
              id="label"
              type="text"
              placeholder="Home, Office, Shop, etc."
              {...register("label")}
              className="bg-background border-white/10"
            />
            {errors.label && (
              <p className="text-sm text-destructive">{errors.label.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Full Address</Label>
            <Textarea
              id="address"
              placeholder="132 Main GA, City, Country"
              rows={4}
              {...register("address")}
              className="bg-background border-white/10 resize-none"
            />
            {errors.address && (
              <p className="text-sm text-destructive">{errors.address.message}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_default"
              {...register("is_default")}
              className="w-4 h-4 rounded border-white/10 bg-background cursor-pointer accent-primary"
            />
            <Label htmlFor="is_default" className="cursor-pointer text-sm font-normal">
              Set as default address
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full rounded-full py-6"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : isEdit ? "Update Address" : "Add Address"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
