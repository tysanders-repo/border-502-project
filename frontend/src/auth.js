import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
console.log(process.env.NEXT_PUBLIC_NEXTAUTH_URL);
const useSecureCookies = process.env.NEXT_PUBLIC_NEXTAUTH_URL.startsWith("https://");
const cookiePrefix = useSecureCookies ? "__Secure-" : "";
const hostName = new URL(process.env.NEXT_PUBLIC_NEXTAUTH_URL).hostname;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  secret: "secret",
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        domain: hostName == "localhost" ? hostName : "." + hostName, // add a . in front so that subdomains are included
        // maxAge: 60 * 60 commented out for now until I find a way to refresh efficiently
      },
    },
  },
});
