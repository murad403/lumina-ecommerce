import { createApi, DefinitionType, fetchBaseQuery, type BaseQueryApi, type BaseQueryFn, type FetchArgs } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
// import { getCurrentUser } from "@/app/utils/auth";

// base query-----------------------------------------------------------------------------------------------
const baseQuery = fetchBaseQuery({
    baseUrl: "http://10.10.12.28:8001/api",
    // prepareHeaders: async(headers, { getState }) => {
    //     const {refresh} = await getCurrentUser();
    //     if (refresh) {
    //         headers.set('Authorization', `Bearer ${refresh}`);
    //     }
    //     return headers;
    // }
})

const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQuery,
    tagTypes: ["auth"],
    endpoints: () => ({})
})


export default baseApi;