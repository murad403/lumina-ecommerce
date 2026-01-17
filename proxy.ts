import { NextRequest, NextResponse } from "next/server";
import { clearTokens, getCurrentUser } from "./utils/auth";

const SIGN_IN_URL = "/auth/sign-in";
const PROFILE_URL = "/";

function isTokenExpired(token: string): boolean {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return true;
        
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
        const exp = payload.exp;
        
        if (!exp) return false;
        return Date.now() >= exp * 1000;
    } catch (error) {
        return true;
    }
}


export async function proxy(request: NextRequest) {
    const {accessToken, refreshToken} = await getCurrentUser();
    const { pathname } = request.nextUrl; 
    const isAuthPage = pathname.startsWith("/auth");

    // if(refreshToken){
    //     const info = await jwt.decode(refreshToken);
    // }

    if (refreshToken && isTokenExpired(refreshToken)) {
        await clearTokens();
        return NextResponse.redirect(new URL(SIGN_IN_URL, request.url));
    }

    if (refreshToken && isAuthPage) {
        return NextResponse.redirect(new URL(PROFILE_URL, request.url));
    }

    if (!refreshToken && !isAuthPage) {
        return NextResponse.redirect(new URL(SIGN_IN_URL, request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/:path*",
  ],
}