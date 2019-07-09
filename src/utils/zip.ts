import archiver from 'archiver'
import { createWriteStream } from 'fs'

export default async function zip(from: string, to: string) {
  const output = createWriteStream(to)
  const ac = archiver('zip')

  ac.pipe(output)
  ac.directory(from, false)
  ac.finalize()

  return new Promise((resolve, reject) => {
    ac.on('error', reject).on('finish', resolve)
  })
}
