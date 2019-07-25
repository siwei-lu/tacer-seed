import archiver from 'archiver'
import { join } from 'path'
import { pathExists, createWriteStream, readFile } from 'fs-extra'

const ignoreFilename = '.tacerignore'
const ignoreFilePathIn = (dir: string) => join(dir, ignoreFilename)

export default async function zip(from: string, to: string) {
  const output = createWriteStream(to)
  const ac = archiver('zip')

  const ignores = ['node_modules/', '.tacerignore']
  const ignoreFile = ignoreFilePathIn(from)
  if (await pathExists(ignoreFile)) {
    const content = await readFile(ignoreFile, 'utf8')
    ignores.push(...content.split('\n'))
  }

  ac.pipe(output)
  ac.glob('**', {
    ignore: ignores,
    cwd: from,
    dot: true,
  })
  ac.finalize()

  return new Promise((resolve, reject) => {
    ac.on('error', reject).on('finish', resolve)
  })
}
