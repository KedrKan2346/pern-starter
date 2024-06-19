import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const webServerPortEnv = process.env["WEB_SERVER_PORT"];
  return {
    plugins: [react()],
    preview: {
      // TechDebt: Solve import from external folder TS config issue.
      port: webServerPortEnv ? parseInt(webServerPortEnv) : undefined,
      strictPort: true,
      host: true, // This option exposes vite for docker
    },
  };
});
