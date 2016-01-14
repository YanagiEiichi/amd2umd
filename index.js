#!/usr/bin/env node

'use strict';

const Capacitance = require('capacitance');
const argollector = require('argollector');
const bfs = require('babel-fs');
const path = require('path');
const config = require('./package.json');

const VERBOSE = !!argollector['-vv'] || !!argollector['-vvv'] || !!argollector['-vvvv'] || !!argollector['--verbose'];

switch(true) {
  case !!argollector['-v'] || !!argollector['-V'] || !!argollector['--version']:
    console.log(config.version);
    break;
  case !!argollector['-h'] || !!argollector['--help']:
    console.log('Usage: amd2umd <AMDFile> [options]');
    console.log('');
    console.log('Options:');
    console.log('  -v, --version          show version');
    console.log('  -h, --help             show help message');
    break;
  default:
    amd2umd(argollector[0]).then(function(result) {
      process.stdout.write(result);
    });
};

function amd2umd(amdfile) {
  return Promise.all([
    bfs.readFile(path.join(__dirname, 'adapter.js')).then(String),
    bfs.readFile(amdfile).then(String),
  ]).then(function(results) {
    return results[0].replace(/<!--\s*CODE\s*-->/, results[1].replace(/^[\r\n]*|[\r\n]*$/g, ''));
  });
}
