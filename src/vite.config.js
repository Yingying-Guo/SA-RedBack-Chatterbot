import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
