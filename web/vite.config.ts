import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import UnoCSS from 'unocss/vite';
import reactSWC from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const webServerPortEnv = process.env['WEB_SERVER_PORT'];
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.WEB_API_URL': JSON.stringify(env.WEB_API_URL),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@shared-layouts': path.resolve(__dirname, './src/features/shared/layouts/index'),
        '@features': path.resolve(__dirname, './src/features'),
        '@config': path.resolve(__dirname, './src/shared/config'),
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
