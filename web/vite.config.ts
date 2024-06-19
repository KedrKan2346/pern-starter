import { defineConfig } from "vite";
import path from "path";
import UnoCSS from "unocss/vite";
import reactSWC from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const webServerPortEnv = process.env["WEB_SERVER_PORT"];
  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@shared-layouts": path.resolve(
          __dirname,
          "./src/features/shared/layouts/index"
        ),
        "@features": path.resolve(__dirname, "./src/features"),
        "@config": path.resolve(__dirname, "./src/shared/config"),
      },
    },
    plugins: [reactSWC(), UnoCSS()],
    preview: {
      // TechDebt: Solve import from external folder TS config issue.
      port: webServerPortEnv ? parseInt(webServerPortEnv) : undefined,
      strictPort: true,
      host: true, // This option exposes vite for docker
    },
  };
});
