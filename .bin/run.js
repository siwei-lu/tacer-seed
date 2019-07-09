#!/usr/bin/env node
const { resolve } = require('path')
const generate = require('../dist')

const zipped = resolve(__dirname, '../template.zip')
generate('seed', zipped, process.argv[2])
