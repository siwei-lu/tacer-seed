import copy from 'utils/copy'
import { existsSync, readFileSync, readdirSync } from 'fs'
import { execSync } from 'child_process'
import { resolve } from 'path'

describe('Copy Util', () => {
  it('should copy all items from src to dest', async () => {
    const srcdir = resolve(__dirname, '..')
    const tmpdir = resolve(__dirname, '../.tmp')

    await copy(srcdir, tmpdir)
    existsSync(`${tmpdir}/utils/copy.ts`).should.true
    execSync(`rm -rf ${tmpdir}`)
  })

  it('should copy no item but the copy.ts', async () => {
    const srcdir = resolve(__dirname, '..')
    const tmpdir = resolve(__dirname, '../.tmp2')

    await copy(srcdir, tmpdir, op => {
      if (!op.path.match(/copy\.ts$/)) {
        return false
      }
      return op
    })

    readdirSync(`${tmpdir}/utils`).should.length(1)
    existsSync(`${tmpdir}/utils/copy.ts`).should.true
    execSync(`rm -rf ${tmpdir}`)
  })

  it('should copy copy.ts with a new content', async () => {
    const tmpPath = resolve(__dirname, '../.tmp-copy')

    await copy(__filename, tmpPath, op => ({
      path: op.path,
      content: 'Hello, world'
    }))
    
    readFileSync(tmpPath, 'utf8').should.eq('Hello, world')
    execSync(`rm -rf ${tmpPath}`)
  })
})
