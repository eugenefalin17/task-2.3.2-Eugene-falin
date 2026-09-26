import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/task-2.3.2-Eugene-falin/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
});
