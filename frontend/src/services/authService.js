"use server";

import { API_URL } from "../constants"
import { cookies } from "next/headers"

/**
 * Check if the user is signed in by checking for the session token cookie.
 *
 * @returns {Promise<boolean>} A promise that resolves to true if the user is signed in, otherwise false.
 */
export async function signedIn() {
  return cookies().get("next-auth.session-token")?.value !== undefined;
}

/**
 * Set up user information (UIN and role) in cookies.
 *
 * This function fetches the user's role from the API and stores it in cookies.
 * If the user is not found, it sets the role and UIN to "none".
 *
 * @returns {Promise<void>} A promise that resolves when the user info is set.
 */
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

/**
 * Deletes user information from cookies when the user signs out.
 *
 * @returns {Promise<void>} A promise that resolves when the user info is deleted.
 */
export async function deleteUserInfo() {
  cookies().delete("uin");
  cookies().delete("role");
}


/**
 * Get the user's role from cookies.
 *
 * @returns {Promise<string|null>} A promise that resolves to the user's role or null if not found.
 */
export async function getUserRole() {
  // return cookies().get("role")?.value;
  return "president";
}

/**
 * Get the user's UIN from cookies.
 *
 * @returns {Promise<string|null>} A promise that resolves to the user's UIN or null if not found.
 */
export async function getUserUIN() {
  return "331005076";
  // return cookies().get("uin")?.value;
}

