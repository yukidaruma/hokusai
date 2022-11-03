import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

const inputFile = process.argv[2];
const input = fs
  .readFileSync(inputFile)
  .toString()
  .split('\n')
  .filter((line) => !line.startsWith('#'))
  .join('\n');

const rawData = parse(input, {
  columns: [
    '_timestamp',
    'name',
    'variant',
    'achievement',
    'rule_good_at',
    'rule_bad_at',
    'power_sz',
    'power_tc',
    'power_rm',
    'power_cb',
    'respect',
    'rival',
    'enemy_weapon',
    'memory',
    'comment',
  ],
  from: 0,
  delimiter: ',',
});

const data = rawData.map((player) => {
  const { _timestamp, ...rest } = player;
  const entries = Object.entries(rest).map(([key, value]) => {
    if (key.startsWith('power_')) {
      if (Number.isNaN(Number(value))) {
        value = null;
      } else {
        value = Number(value);
      }
    }
    return [key, value];
  });
  return Object.fromEntries(entries);
});

const __filename = fileURLToPath(import.meta.url);
fs.writeFileSync(
  path.resolve(path.dirname(__filename), '../src/players.json'),
  JSON.stringify(data, undefined, 2)
);
