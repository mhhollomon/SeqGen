import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({command, mode}) => {
    const isProduction = (command === 'build' && mode === 'production');

    console.log(`isProduction: ${isProduction}`);

    return {
        base: (isProduction ? '/SeqGen/' : ''),
        baseUrl: (isProduction ? '/SeqGen/' : ''),
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
            outDir: 'build-web-deploy',
            cssMinify: 'lightningcss',
        },
}});
