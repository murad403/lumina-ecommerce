import baseApi from "@/redux/api/baseApi";

const wishlistApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getWishlist: builder.query({
            query: () =>{
                return {
                    url: `/products/wishlist/`,
                    method: "GET"
                }
            }
        }),
        addToWishlist: builder.mutation({
            query: (id) =>{
                return {
                    url: `/products/wishlist/toggle/${id}/`,
                    method: "POST"
                }
            }
        }),
        removeFromWishlist: builder.mutation({
            query: (id) =>{
                return {
                    url: `/products/wishlist/toggle/${id}/`,
                    method: "DELETE"
                }
            }
        })
    })
})

export const { useGetWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation } = wishlistApi;