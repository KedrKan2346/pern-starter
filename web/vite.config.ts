import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import reactSWC from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const webServerPortEnv = process.env["WEB_SERVER_PORT"];
  return {
    plugins: [reactSWC(), UnoCSS()],
    preview: {
      // TechDebt: Solve import from external folder TS config issue.
      port: webServerPortEnv ? parseInt(webServerPortEnv) : undefined,
      strictPort: true,
      host: true, // This option exposes vite for docker
    },
  };
});
