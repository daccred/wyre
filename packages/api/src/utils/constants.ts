export const ADMIN = "admin";
export const SUPER_ADMIN = "super-admin";
export const USER = "user";

export const getBaseUrl = () => {
  // if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};
