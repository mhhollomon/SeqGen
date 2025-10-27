import type { Config } from "@react-router/dev/config";

const basename = import.meta.env.BASE_URL;

console.log(`basename: ${basename}`);


export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  buildDirectory : 'build-web-deploy',
  basename : basename,
  ssr: false,
} satisfies Config;
