import { Entry } from 'unzipper'
import { mkdirs, createFile, createWriteStream } from 'fs-extra'

export default async function copy(entry: Entry, dest: string) {
  if (entry.type === 'Directory') {
    await mkdirs(dest)
    return
  }

  await createFile(dest)
  const ws = entry.pipe(createWriteStream(dest))

  return new Promise((resolve, reject) => {
    ws.on('finish', resolve).on('error', reject)
  })
}
