import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'trashos-api.tanujts.me',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
