import baseApi from "@/redux/api/baseApi";

const shippingAddressApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getShippingAddresses: builder.query({
            query: () =>{
                return {
                    url: `/addresses/`,
                    method: "GET"
                }
            }
        }),

        addShippingAddress: builder.mutation({
            query: (data) =>{
                return {
                    url: `/addresses/`,
                    method: "POST",
                    body: data
                }
            }
        }),

        updateShippingAddress: builder.mutation({
            query: (id) =>{
                return {
                    url: `/addresses/${id}/`,
                    method: "PUT"
                }
            }
        }),

        setDefaultAddress: builder.mutation({
            query: (id) =>{
                return {
                    url: `/addresses/${id}/set-default/`,
                    method: "POST"
                }
            }
        }),

        removeShippingAddress: builder.mutation({
            query: (id) =>{
                return {
                    url: `/addresses/${id}/`,
                    method: "DELETE"
                }
            }
        }),
    })
})

export const { useGetShippingAddressesQuery, useAddShippingAddressMutation, useUpdateShippingAddressMutation, useSetDefaultAddressMutation, useRemoveShippingAddressMutation } = shippingAddressApi;