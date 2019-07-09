import unzip from '~/utils/unzip'
import os from 'os'
import { join, resolve } from 'path'
import { remove, mkdirs, createWriteStream, createFile } from 'fs-extra'
import { existsSync } from 'fs'
import { Entry } from 'unzipper'

describe('unzip()', () => {
  it('should unzip the file in the given path', async () => {
    const tmpdir = join(os.tmpdir(), 'unzip')
    const target = resolve(__dirname, '../resources/testZip.zip')

    await mkdirs(tmpdir)
    await unzip(target, tmpdir)

    existsSync(join(tmpdir, 'index.ts')).should.be.true
    await remove(tmpdir)
  })

  it('should work with the map function', async () => {
    const tmpdir = join(os.tmpdir(), 'unzip2')
    const target = resolve(__dirname, '../resources/testZip.zip')

    await mkdirs(tmpdir)
    await unzip(target, tmpdir, async (entry: Entry) => {
      if (entry.path === 'index.ts') {
        return false
      }

      if (entry.path === 'utils/unzip.ts') {
        const destPath = join(tmpdir, 'unzip.ts')
        await createFile(destPath)

        const ws = createWriteStream(destPath)
        entry.pipe(ws)

        await new Promise((resolve, reject) => {
          ws.on('finish', resolve).on('error', reject)
        })
        return false
      }

      return true
    })

    existsSync(join(tmpdir, 'index.ts')).should.be.false
    existsSync(join(tmpdir, 'unzip.ts')).should.be.true
    existsSync(join(tmpdir, 'utils/zip.ts')).should.true

    await remove(tmpdir)
  })
})
