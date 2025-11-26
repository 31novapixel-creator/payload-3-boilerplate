import * as migration_20241125_222020_initial from './20241125_222020_initial';
import * as migration_20241214_124128 from './20241214_124128';
import * as migration_20251126_150345_add_bento_grid from './20251126_150345_add_bento_grid';
import * as migration_20251126_151501 from './20251126_151501';
import * as migration_20251126_155831_latest from './20251126_155831_latest';

export const migrations = [
  {
    up: migration_20241125_222020_initial.up,
    down: migration_20241125_222020_initial.down,
    name: '20241125_222020_initial',
  },
  {
    up: migration_20241214_124128.up,
    down: migration_20241214_124128.down,
    name: '20241214_124128',
  },
  {
    up: migration_20251126_150345_add_bento_grid.up,
    down: migration_20251126_150345_add_bento_grid.down,
    name: '20251126_150345_add_bento_grid',
  },
  {
    up: migration_20251126_151501.up,
    down: migration_20251126_151501.down,
    name: '20251126_151501',
  },
  {
    up: migration_20251126_155831_latest.up,
    down: migration_20251126_155831_latest.down,
    name: '20251126_155831_latest'
  },
];
