import baseApi from "@/redux/api/baseApi";

const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getCart: builder.query({
            query: () =>{
                return {
                    url: `/products/cart/`,
                    method: "GET"
                }
            },
            providesTags: ["cart"]
        }),

        addToCart: builder.mutation({
            query: (data) =>{
                return {
                    url: `/products/cart/`,
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["cart"]
        }),

        updateCart: builder.mutation({
            query: ({id, data}) =>{
                // console.log(id, data);
                return {
                    url: `/products/cart/items/${id}/`,
                    method: "PATCH",
                    body: data
                }
            },
            invalidatesTags: ["cart"]
        }),

        deleteCart: builder.mutation({
            query: (id) =>{
                return {
                    url: `/products/cart/items/${id}/`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ["cart"]
        }),

    })
})

export const { useGetCartQuery, useAddToCartMutation, useUpdateCartMutation, useDeleteCartMutation } = cartApi;