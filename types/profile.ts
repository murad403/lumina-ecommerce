
export type TProfileOrderHistory = {
    id: number
    order_number: string
    created_at: string
    items_count: number
    total_amount: string
    status: string
    status_display: string
}

export type TShippingAddress = {
    id: number
    label: string
    address: string
    is_default: boolean
    created_at: string
    updated_at: string
}

