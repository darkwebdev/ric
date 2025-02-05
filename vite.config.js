import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [
        react(),
        svgr(),
    ],
    test: {
        /* for example, use global to avoid globals imports (describe, test, expect): */
        globals: true,
    },
})
