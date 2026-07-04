import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL || ''),
      'process.env.VITE_STRIPE_PUBLISHABLE_KEY': JSON.stringify(
        env.VITE_STRIPE_PUBLISHABLE_KEY || ''
      ),
      'process.env.VITE_GA_MEASUREMENT_ID': JSON.stringify(env.VITE_GA_MEASUREMENT_ID || ''),
    },
    server: {
      port: 5173,
    },
  };
});
