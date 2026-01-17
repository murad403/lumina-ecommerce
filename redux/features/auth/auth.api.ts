import baseApi from "@/redux/api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        signUp: builder.mutation({
            query: (data) =>{
                return {
                    url: "/auth/signup/",
                    method: "POST",
                    body: data
                }
            }
        })
    })
})