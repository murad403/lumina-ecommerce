import baseApi from "@/redux/api/baseApi";

const shippingAddressApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getShippingAddresses: builder.query({
            query: () =>{
                return {
                    url: `/addresses/`,
                    method: "GET"
                }
            },
            providesTags: ["addresses"]
        }),

        addShippingAddress: builder.mutation({
            query: (data) =>{
                return {
                    url: `/addresses/`,
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["addresses"]
        }),

        updateShippingAddress: builder.mutation({
            query: ({id, data}) =>{
                return {
                    url: `/addresses/${id}/`,
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: ["addresses"]
        }),

        setDefaultAddress: builder.mutation({
            query: (id) =>{
                return {
                    url: `/addresses/${id}/set-default/`,
                    method: "POST"
                }
            },
            invalidatesTags: ["addresses"]
        }),

        removeShippingAddress: builder.mutation({
            query: (id) =>{
                return {
                    url: `/addresses/${id}/`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ["addresses"]
        }),
    })
})

export const { useGetShippingAddressesQuery, useAddShippingAddressMutation, useUpdateShippingAddressMutation, useSetDefaultAddressMutation, useRemoveShippingAddressMutation } = shippingAddressApi;