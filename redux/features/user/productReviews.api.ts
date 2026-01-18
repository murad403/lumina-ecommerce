import baseApi from "@/redux/api/baseApi";

const productReviewsApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        viewProductReviews: builder.query({
            query: (slug) =>{
                return {
                    url: `/products/products/${slug}/reviews/`,
                    method: "GET"
                }
            }
        }),

        addProductReview: builder.mutation({
            query: ({data, slug}) =>{
                return {
                    url: `/products/products/${slug}/reviews/`,
                    method: "POST",
                    body: data
                }
            }
        }),

        updateProductReview: builder.mutation({
            query: (id) =>{
                return {
                    url: `/products/reviews/${id}/`,
                    method: "PUT"
                }
            }
        }),


        deleteProductReview: builder.mutation({
            query: (id) =>{
                return {
                    url: `/products/reviews/${id}/`,
                    method: "DELETE"
                }
            }
        }),


    })
})

export const { useViewProductReviewsQuery, useAddProductReviewMutation, useUpdateProductReviewMutation, useDeleteProductReviewMutation } = productReviewsApi;