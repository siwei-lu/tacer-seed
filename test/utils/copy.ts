import copy from '~/utils/copy'
import { resolve } from 'path'
import { remove, existsSync } from 'fs-extra'
import { Open } from 'unzipper'

describe('copy()', () => {
  it('should copy a unzipper entry to the destination', async () => {
    const path = resolve(__dirname, '../resources/testZip.zip')
    const dest = resolve(__dirname, './.testCopy.ts')

    const { files } = await Open.file(path)
    await copy(files[0].stream(), dest)

    existsSync(dest).should.be.true
    remove(dest)
  })
})
