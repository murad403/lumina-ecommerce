import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { getCurrentUser } from "@/utils/auth";

// base query-----------------------------------------------------------------------------------------------
const baseQuery = fetchBaseQuery({
    baseUrl: "http://10.10.12.28:8001/api",
    prepareHeaders: async(headers, { getState }) => {
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