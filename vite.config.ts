import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [reactRouter(), tsconfigPaths()],
    css: {
        transformer: 'lightningcss',
        preprocessorOptions: {
            scss: {
                silenceDeprecations: [
                    'import',
                    'color-functions',
                    'global-builtin',
                ],
            },
        },
    },
    build: {
        cssMinify: 'lightningcss', // Use Lightning CSS for CSS minification during build
    },
});
