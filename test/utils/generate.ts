import generate from '~/utils/generate'
import { resolve } from 'path'
import { existsSync, remove } from 'fs-extra'
import os from 'os'
import sinon from 'sinon'
import { Readable, Writable } from 'stream'

describe('generate()', () => {
  it('should extract the files in the template.zip, render and move them to the destination', async () => {
    const tpl = resolve(__dirname, '../../template.zip')
    const dest = resolve(os.tmpdir(), './.tacer-generate')

    const fakeStdout: any = new Writable({ write: () => {} })
    const fakeStdin: any = new Readable()

    fakeStdin.push('test\n')
    fakeStdin.push('0.1.0\n')
    fakeStdin.push('\n')
    fakeStdin.push('\n')
    fakeStdin.push('\n')
    fakeStdin.push('\n')
    fakeStdin.push(null)

    sinon.replaceGetter(process, 'stdin', () => fakeStdin)
    sinon.replaceGetter(process, 'stdout', () => fakeStdout)

    await generate('test', tpl, dest)
    sinon.restore()

    const pkgPath = resolve(dest, 'package.json')
    existsSync(pkgPath).should.be.true

    const pkg = require(pkgPath)
    pkg.name.should.eq('test')
    await remove(dest)
  })
})
