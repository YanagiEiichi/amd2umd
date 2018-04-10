#!/usr/bin/env node

'use strict';

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
    console.log('  -n, --name             global name');
    break;
  default:
    amd2umd(argollector[0]).then(function(result) {
      process.stdout.write(result);
    }).catch(console.error);
};

function amd2umd(amdfile) {
  return Promise.all([
    bfs.readFile(path.join(__dirname, 'adapter.js')).then(String),
    bfs.readFile(amdfile).then(String),
  ]).then(function(results) {
    var template = results[0];
    var source = results[1].replace(/^[\r\n]*|[\r\n]*$/g, '');
    var dependencies;
    try {
      Function('define', source)(function(name, deps, factory) {
        if(typeof name !== 'string') factory = deps, deps = name, name = null;
        if(!(deps instanceof Array)) factory = deps, deps = [];
        dependencies = deps instanceof Array ? deps : [];
      });
      if(!(dependencies instanceof Array)) throw 0;
    } catch(e) {
      throw new Error('Resolve dependencies failed: ' + e.message);
    }
    var $scope = {
      globalName: 'globalName = ' + JSON.stringify(argollector['-n'] || argollector['--name']) + ';',
      source: source,
      dependencies: 'args = [ ' + dependencies.map(function(name) {
        return 'require(\'' + name + '\')';
      }).join(', ') + ' ];'
    };
    return template.replace(/<!--\s*(.*?)\s*-->/g, function($0, $1) {
      var keys = Object.keys($scope);
      var values = Object.keys($scope).map(function(name) { return $scope[name]; });
      try {
        return new Function(keys, 'return (' + $1 + ')').apply($scope, values);
      } catch(e) {
        return new Function(keys, $1).apply($scope, values);
      }
    });
  });
}
