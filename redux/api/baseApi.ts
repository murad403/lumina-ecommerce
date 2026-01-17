import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { getCurrentUser } from "@/utils/auth";

// base query-----------------------------------------------------------------------------------------------
const baseQuery = fetchBaseQuery({
    baseUrl: "https://db926d6p-8000.asse.devtunnels.ms/api",
    prepareHeaders: async(headers) => {
        const {refreshToken} = await getCurrentUser();
        if (refreshToken) {
            headers.set('Authorization', `Bearer ${refreshToken}`);
        }
        return headers;
    }
})

const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQuery,
    tagTypes: ["auth"],
    endpoints: () => ({})
})


export default baseApi;