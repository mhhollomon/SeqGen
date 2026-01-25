import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const URL_PREFIX = '/SeqGen/';

export default defineConfig(({command, mode}) => {
    const isProduction = (command === 'build' && mode === 'production');

    return {
        base: (isProduction ? URL_PREFIX : ''),
        baseUrl: (isProduction ? URL_PREFIX : ''),
        plugins: [tsconfigPaths()],
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
            outDir: 'build-web-deploy',
            cssMinify: 'lightningcss',
        },
}});
