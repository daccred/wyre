/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

const dev = process.env.NODE_ENV === "development";

/* plugins */
// import * as pwa from 'next-pwa'
// import runtimeCaching from 'next-pwa/cache';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const runtimeCaching = import('next-pwa/cache');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = import("next-pwa").then((pwa) =>
  pwa.default({
    dest: "public",
    disable: dev,
    register: true,
  })
);

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
export default withPWA.then((pwa) => pwa(config));
