import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

const URL_PREFIX = '/SeqGen/';

export default defineConfig(({command, mode}) => {
    const isProduction = (command === 'build' && mode === 'production');

    return {
        base: (isProduction ? URL_PREFIX : ''),
        baseUrl: (isProduction ? URL_PREFIX : ''),
        plugins: [react(), tsconfigPaths()],
        css: {
            transformer: 'lightningcss',
        },
        build: {
            outDir: 'build-web-deploy',
            cssMinify: 'lightningcss',
        },
}});
