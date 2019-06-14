#!/usr/bin/env node
const { resolve } = require('path')
const { generate } = require('tacer-seed')

const path = resolve(__dirname, '../template')

generate('seed', path, process.argv[2])
