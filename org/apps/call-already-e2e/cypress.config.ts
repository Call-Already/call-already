import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run call-already:serve',
        production: 'nx run call-already:preview',
      },
      ciWebServerCommand: 'nx run call-already:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
