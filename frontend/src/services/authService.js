"use server";
import { cookies } from "next/headers"

export async function signedIn() {
    if(cookies().get("next-auth.session-token")?.value === undefined){
        console.log("Value is undefined");
    }else{
        console.log("Value is defined");
        console.log(cookies().get("next-auth.session-token")?.value)
    }
    //console.log(cookies().get("next-auth.session-token")?.value);
    return cookies().get("next-auth.session-token")?.value !== undefined;// ||
    //cookies().get("next-auth.session-token")?.value !== "";
}

export async function deleteCookie() {
    //console.log(cookies().get("next-auth.session-token")?.value);
    cookies().delete("next-auth.session-token");
    //console.log(cookies().get("next-auth.session-token"));
    //console.log("print");
    //return cookies().get("next-auth.session-token")?.value !== undefined;
}