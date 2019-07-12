#!/usr/bin/env node
const { join } = require('path')
const { zip } = require('../dist')

const cwd = process.cwd()
const from = join(cwd, 'template')
const to = join(cwd, 'template.zip')

zip(from, to)
