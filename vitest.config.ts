// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Habilita APIs globais como describe(), it(), expect()
    // para que você não precise importá-las em todos os arquivos.
    globals: true,
    // Define o ambiente de teste (ex: 'node' para backend, 'jsdom' para frontend)
    environment: 'node',
  },
});