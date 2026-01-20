import baseApi from "@/redux/api/baseApi";

const wishlistApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getWishlist: builder.query({
            query: () =>{
                return {
                    url: `/products/wishlist/`,
                    method: "GET"
                }
            },
            providesTags: ["wishlist"]
        }),
        wishListToggle: builder.mutation({
            query: (id) =>{
                return {
                    url: `/products/wishlist/toggle/${id}/`,
                    method: "POST"
                }
            },
            invalidatesTags: ["wishlist"]
        })
    })
})

export const { useGetWishlistQuery, useWishListToggleMutation } = wishlistApi;