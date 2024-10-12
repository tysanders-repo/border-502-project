"use server";
const API_URL = "http://localhost:3000";
import { cookies } from "next/headers";

// Returns if user is signed in
export async function signedIn() {
  return cookies().get("next-auth.session-token")?.value !== undefined;
}
// Sets up user info (uin and role)
export async function setUserInfo() {
  const token = cookies().get("next-auth.session-token")?.value;
  const response = await fetch(`${API_URL}/member/role`, {
    method: "GET",
    headers: {
      Authentication: `${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });
  const isUser = response.ok;
  const data = isUser ? await response.json() : null;

  cookies().set({
    name: "role",
    value: isUser ? data?.role : "none",
    httpOnly: true,
    secure: false, // false for now, will be secure once hosted online.
    sameSite: "lax",
    path: "/",
    // maxAge: 60 * 60, commented out for now until I find a way to refresh efficiently
  });
  cookies().set({
    name: "uin",
    value: isUser ? data?.uin : "none",
    httpOnly: true,
    secure: false, // false for now, will be secure once hosted online.
    sameSite: "lax",
    path: "/",
    // maxAge: 60 * 60, commented out for now until I find a way to refresh efficiently
  });
}

// Deletes user info, called when user signs out
export async function deleteUserInfo() {
  cookies().delete("uin");
  cookies().delete("role");
}

export async function getUserRole() {
  return cookies().get("role")?.value;
}

export async function getUserUIN() {
  return cookies().get("uin")?.value;
}
