/**
 * run-maestro.js — Run the local Maestro CLI from .tools/maestro.
 */

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const maestroBat = path.join(rootDir, '.tools', 'maestro', 'maestro', 'bin', 'maestro.bat');
const maestroZipUrl = 'https://github.com/mobile-dev-inc/Maestro/releases/latest/download/maestro.zip';

const installMaestro = () => {
  const toolsDir = path.join(rootDir, '.tools');
  const zipPath = path.join(toolsDir, 'maestro.zip');
  const extractDir = path.join(toolsDir, 'maestro');

  fs.mkdirSync(toolsDir, { recursive: true });

  console.log('Downloading Maestro CLI...');
  spawnSync(
    'powershell',
    [
      '-NoProfile',
      '-Command',
      `Invoke-WebRequest -Uri '${maestroZipUrl}' -OutFile '${zipPath}'; Expand-Archive -Path '${zipPath}' -DestinationPath '${extractDir}' -Force`,
    ],
    { stdio: 'inherit' }
  );
};

if (!fs.existsSync(maestroBat)) {
  installMaestro();
}

if (!fs.existsSync(maestroBat)) {
  console.error('Maestro CLI not found. Install failed.');
  process.exit(1);
}

const defaultEnv = {
  BASE_URL: process.env.BASE_URL || 'https://namerrs.web.app',
  COMPLETION_DATE: process.env.COMPLETION_DATE || '2026-07-15',
  E2E_CONTACT_EMAIL: process.env.E2E_CONTACT_EMAIL || 'maestro-e2e@example.com',
};

const userArgs = process.argv.slice(2);
const envArgs = Object.entries(defaultEnv).flatMap(([key, value]) => ['-e', `${key}=${value}`]);

const args = [...userArgs];
const testIndex = args.indexOf('test');
if (testIndex !== -1) {
  const hasEnvOverride = args.some((arg, index) => arg === '-e' && index > testIndex);
  if (!hasEnvOverride) {
    args.splice(testIndex + 1, 0, ...envArgs);
  }
}
const env = {
  ...process.env,
  MAESTRO_CLI_NO_ANALYTICS: process.env.MAESTRO_CLI_NO_ANALYTICS || 'true',
  MAESTRO_CLI_ANALYSIS_NOTIFICATION_DISABLED:
    process.env.MAESTRO_CLI_ANALYSIS_NOTIFICATION_DISABLED || 'true',
};

const result = spawnSync(maestroBat, args, {
  cwd: rootDir,
  env,
  stdio: 'inherit',
  shell: true,
});

process.exit(result.status ?? 1);