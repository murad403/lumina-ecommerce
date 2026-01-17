"use server"
import { cookies } from "next/headers"


export const saveToken = async(accessToken: string, refreshToken: string) =>{
    (await cookies()).set("accessToken", accessToken);
    (await cookies()).set("refreshToken", refreshToken);
}

export const clearToken = async() =>{
    (await cookies()).delete("accessToken");
    (await cookies()).delete("refreshToken");
}

export const getCurrentUser = async() =>{
    const accessToken = (await cookies()).get("accessToken")?.value || null;
    const refreshToken = (await cookies()).get("refreshToken")?.value || null;
    return {accessToken, refreshToken};
}