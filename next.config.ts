import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["dashboard.staging.beammarkets.com","https://beam-customer-portal.onrender.com"],
    },
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true, // 301 redirect
      },
    ];
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)", // Apply headers to all routes
  //       headers: [
  //         {
  //           key: "X-Frame-Options",
  //           value: "DENY", // Prevent clickjacking
  //         },
  //         {
  //           key: "X-Content-Type-Options",
  //           value: "nosniff", // Prevent MIME type sniffing
  //         },
  //         {
  //           key: "Referrer-Policy",
  //           value: "strict-origin-when-cross-origin", // Secure referrer policy
  //         },
  //         {
  //           key: "Strict-Transport-Security",
  //           value: "max-age=31536000; includeSubDomains; preload", // Enforce HTTPS
  //         },
  //         {
  //           key: "Content-Security-Policy",
  //           value:
  //             "default-src 'self'; script-src 'self' 'unsafe-inline' https://trusted.cdn.com;", // Prevent XSS
  //         },
  //         {
  //           key: "Permissions-Policy",
  //           value: "geolocation=(), microphone=()", // Restrict browser features
  //         },
  //         {
  //           key: "X-XSS-Protection",
  //           value: "1; mode=block", // Protect against XSS
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
