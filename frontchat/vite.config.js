import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    disabled: true, // Desativa a otimização de dependências
  },
  build: {
    commonjsOptions: {
      include: [], // Remove as opções de inclusão do CommonJS
    },
  },
  plugins: [react()],
})
