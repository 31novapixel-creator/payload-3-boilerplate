import * as migration_20251126_161627_initial from './20251126_161627_initial';

export const migrations = [
  {
    up: migration_20251126_161627_initial.up,
    down: migration_20251126_161627_initial.down,
    name: '20251126_161627_initial'
  },
];
