const tsconfig = require('./tsconfig.json');
tsconfig.compilerOptions.module = 'commonjs';

process.env.NODE_ENV = 'test';
process.env.ENV = 'test';

require('source-map-support/register');
require('ts-node').register(tsconfig);

// const chai = require('chai')
