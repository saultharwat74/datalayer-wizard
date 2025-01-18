// manifest.config.ts
import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
  manifest_version: 3,
  name: 'DataLayer Wizard',
  version: '1.0.0',
  description: 'Create and push dynamic dataLayer events without tech skills.',
  icons: {
    '16': 'icons/16.png',
    '32': 'icons/32.png',
    '48': 'icons/48.png',
    '64': 'icons/64.png',
    '128': 'icons/128.png',
  },
  action: {
    default_popup: 'index.html',
  },
  background: {
    service_worker: 'src/background.ts',
    type: 'module' as const,
  },
  permissions: ['activeTab', 'scripting'],
});
