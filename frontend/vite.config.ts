import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    proxy: {
      '/api': {
        // set target to backend base url
        target: 'http://localhost:3333',
        changeOrigin: true
      },
      '/docs': {
        target: 'http://localhost:3333',
        changeOrigin: true
      },
      '/swagger.json': {
        target: 'http://localhost:3333',
        changeOrigin: true
      }
    }
  }
});
