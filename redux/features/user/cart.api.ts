import baseApi from "@/redux/api/baseApi";

const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getCart: builder.query({
            query: () =>{
                return {
                    url: `/products/cart/`,
                    method: "GET"
                }
            }
        }),
        addToCart: builder.mutation({
            query: (id) =>{
                return {
                    url: `/products/cart/`,
                    method: "POST"
                }
            }
        }),

        updateCart: builder.mutation({
            query: ({id, data}) =>{
                return {
                    url: `/products/cart/items/${id}/`,
                    method: "PATCH",
                    body: data
                }
            }
        }),


        deleteCart: builder.mutation({
            query: (id) =>{
                return {
                    url: `/products/cart/items/${id}/`,
                    method: "DELETE"
                }
            }
        }),


    })
})

export const { useGetCartQuery, useAddToCartMutation, useUpdateCartMutation, useDeleteCartMutation } = cartApi;