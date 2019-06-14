#!/usr/bin/env node
const { resolve } = require('path')
const { generate } = require('../dist')

const path = resolve(__dirname, '../template')
generate('seed', path, process.argv[2])
