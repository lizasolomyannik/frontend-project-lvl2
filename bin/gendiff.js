#!/usr/bin/env node
/* eslint-disable import/extensions */

import { Command } from 'commander';
import getDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(getDiff(filepath1, filepath2)); // eslint-disable-line no-console
  });

program.parse();
