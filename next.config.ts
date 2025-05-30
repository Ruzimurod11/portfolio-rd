import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig = {
    productionBrowserSourceMaps: false,
    compress: true,
    poweredByHeader: false,
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "*" },
            { protocol: "http", hostname: "*" },
        ],
        minimumCacheTTL: 60,
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    // Make FIREBASE_CONFIG available to service worker
    publicRuntimeConfig: {
        FIREBASE_CONFIG: {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId:
                process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
            measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
        },
    },
} satisfies NextConfig

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")
export default withNextIntl(nextConfig)
