import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Inspect(), // Integrate Inspect
    eslintPlugin() // Integrate ESLint 
  ],
  server: {
    host: "localhost",
    port: 5173,
    // Provide a callback to hook into Vite's server start
    configureServer: ({ middleware }) => {
    // Attach the Express app to Vite's server middleware
      middleware.use(app);
    },
  },
})
