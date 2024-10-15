export const API_URL = process.env.NEXT_PUBLIC_API_URL;
const useSecureCookies = process.env.NEXT_PUBLIC_NEXTAUTH_URL.startsWith("http://");
const cookiePrefix = useSecureCookies ? "__Secure-" : "";
const hostName = new URL(process.env.NEXT_PUBLIC_NEXTAUTH_URL).hostname;
export const TOKEN_NAME = `${cookiePrefix}next-auth.session-token`; 
