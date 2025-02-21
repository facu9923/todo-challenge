import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite conexiones desde fuera del contenedor
    port: 3000,      // Puerto que usamos en docker-compose
    watch: {
      usePolling: true  // Necesario para hot reload en Docker
    }
  }
})