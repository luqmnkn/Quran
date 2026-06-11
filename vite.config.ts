import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';

export default defineConfig(({ mode }) => {
  // Load standard env files (.env, .env.local, process.env)
  const env = loadEnv(mode, process.cwd(), '');

  // Prioritize VITE_API_URL from standard environments or process environment
  let apiUrl = env.VITE_API_URL || process.env.VITE_API_URL || '';

  // Failover gracefully to parsing .env.example if missing
  if (!apiUrl) {
    const envExamplePath = path.resolve(process.cwd(), '.env.example');
    if (fs.existsSync(envExamplePath)) {
      try {
        const content = fs.readFileSync(envExamplePath, 'utf-8');
        const match = content.match(/^VITE_API_URL=(.+)$/m);
        if (match && match[1]) {
          apiUrl = match[1].replace(/["']/g, '').trim();
        }
      } catch (e) {
        console.error('Failed to parse fallback from .env.example:', e);
      }
    }
  }

  return {
    plugins: [
      react(), 
      tailwindcss()
    ],
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(apiUrl),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
