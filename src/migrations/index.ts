import * as migration_20260420_125239_init from './20260420_125239_init';

export const migrations = [
  {
    up: migration_20260420_125239_init.up,
    down: migration_20260420_125239_init.down,
    name: '20260420_125239_init'
  },
];
