import baseApi from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getProducts: builder.query({
            query: ({search, category, min_price, max_price}) =>{
                const params = new URLSearchParams();
                if(search) params.append('search', search);
                if(category) params.append("category", category);
                if(min_price) params.append("min_price", min_price.toString());
                if(max_price) params.append("max_price", max_price.toString());
                const queryString = params.toString();
                const url = queryString ? `/products/products/?${queryString}` : `/products/products/`;
                // console.log(url);
                return {
                    url,
                    method: "GET"
                }
            },
            providesTags: ["wishlist"]
        }),

        productDetails: builder.query({
            query: (id) =>{
                return {
                    url: `/products/products/${id}/`,
                    method: "GET"
                }
            }
        }),
    })
})

export const { useGetProductsQuery, useProductDetailsQuery } = productApi;