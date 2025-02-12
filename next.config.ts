import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "lh3.googleusercontent.com",
            },
            { hostname: "drive.google.com" },
        ],
    },
};

export default nextConfig;
