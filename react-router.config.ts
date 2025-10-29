import type { Config } from "@react-router/dev/config";

const basename = (import.meta.env.MODE === 'production') ? '/SeqGen/' : '';

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  buildDirectory : 'build-web-deploy',
  basename : basename,
  ssr: false,
} satisfies Config;
