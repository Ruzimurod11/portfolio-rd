import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

export default defineConfig({
    plugins: [react()],
    resolve: {
        // resolves the "@/*" -> "./*" alias from tsconfig.json
        tsconfigPaths: true,
    },
    css: {
        // the project's postcss config loads the Tailwind v4 plugin, which vite
        // cannot consume; tests never assert on styles, so skip postcss entirely
        postcss: { plugins: [] },
    },
    test: {
        environment: "jsdom",
        setupFiles: ["./tests/setup.tsx"],
        include: ["**/*.test.{ts,tsx}"],
        exclude: ["node_modules/**", ".next/**"],
    },
})
