import baseApi from "@/redux/api/baseApi";


const orderTrackingApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        viewOrderHistory: builder.query({
            query: () =>{
                return {
                    url: `/orders/`,
                    method: "GET"
                }
            }
        }),
        viewOrderDetails: builder.query({
            query: (orderNumber) =>{
                return {
                    url: `/orders/${orderNumber}/`,
                    method: "GET"
                }
            }
        }),

        publicTracking: builder.mutation({
            query: (data) =>{
                return {
                    url: `/orders/track/`,
                    method: "GET",
                    body: data
                }
            }
        }),
    })
})

export const { useViewOrderHistoryQuery, useViewOrderDetailsQuery, usePublicTrackingMutation } = orderTrackingApi;