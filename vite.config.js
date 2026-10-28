import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.REACT_APP_YOUTUBE_DATA_API_KEY || env.VITE_YOUTUBE_DATA_API_KEY || 'AIzaSyBBarp7NRLPS9MQdEA3AeRQPhkmZq_55AU';

  return {
    plugins: [react()],
    define: {
      'process.env.REACT_APP_YOUTUBE_DATA_API_KEY': JSON.stringify(apiKey),
      'process.env': {}
    },
    server: {
      port: 3000,
      open: false
    }
  };
});
