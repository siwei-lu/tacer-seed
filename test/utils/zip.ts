import zip from '~/utils/zip'
import { resolve } from 'path'
import { existsSync, unlinkSync } from 'fs'

describe('zip()', () => {
  it('should create a zip file compressing the given folder', async () => {
    const from = resolve(__dirname, '..')
    const to = resolve(__dirname, '../.testZip.zip')

    await zip(from, to)
    existsSync(to).should.be.true
    unlinkSync(to)
  })
})
