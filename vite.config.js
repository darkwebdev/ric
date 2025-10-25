import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'


export default defineConfig(async () => {
    const { viteStaticCopy } = await import('vite-plugin-static-copy');
    return {
        plugins: [
            react(),
            svgr(),
            viteStaticCopy({
                targets: [
                    {
                        src: '404.html',
                        dest: '.'
                    }
                ]
            }),
        ],
        server: {
            port: 5183
        },
        test: {
            /* for example, use global to avoid globals imports (describe, test, expect): */
            globals: true,
        },
        base: '/ric/'
    };
})
