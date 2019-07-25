import zip from '~/utils/zip'
import { expect } from 'chai'
import { resolve } from 'path'
import { pathExists, remove } from 'fs-extra'
import { Open } from 'unzipper'

describe('zip()', () => {
  it('should create a zip file compressing the given folder', async () => {
    const from = __dirname
    const to = resolve(__dirname, '../.testZip.zip')

    await zip(from, to)
    expect(await pathExists(to)).true

    const dir = await Open.file(to)
    const paths = dir.files.map(f => f.path)
    paths.includes('generate.ts').should.be.true
    paths.includes('unzip.ts').should.be.false
    paths.includes('zip.ts').should.be.false

    await remove(to)
  })
})
