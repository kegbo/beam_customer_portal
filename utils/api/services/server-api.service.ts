"use server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey =
  process.env.SESSION_SECRET ||
  "fnbdsdkugvshvdbhjskvaudh,behuilwkuktylwhiqduisykugwghjbskauygdv";
const encodedKey = new TextEncoder().encode(secretKey);

async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function setSession(token: string) {
  const decodedToken = await decrypt(token);
  (await cookies()).set({
    name: "next_auth",
    value: decodedToken?.sub || "",
    secure: true,
    httpOnly: true,
  });
}

export async function clearSession() {
  (await cookies()).delete("next_auth");
}
