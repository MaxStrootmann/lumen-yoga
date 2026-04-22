import * as migration_20260420_125239_init from './20260420_125239_init';
import * as migration_20260422_131702_add_global_versions from './20260422_131702_add_global_versions';

export const migrations = [
  {
    up: migration_20260420_125239_init.up,
    down: migration_20260420_125239_init.down,
    name: '20260420_125239_init',
  },
  {
    up: migration_20260422_131702_add_global_versions.up,
    down: migration_20260422_131702_add_global_versions.down,
    name: '20260422_131702_add_global_versions'
  },
];
