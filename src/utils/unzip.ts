import { createReadStream } from 'fs'
import { join } from 'path'
import unzipper, { Entry } from 'unzipper'
import { Transform } from 'stream'
import copy from './copy'

export type ShouldCopyFunc = (entry: Entry) => Promise<boolean>

/**
 * unzip a zipped file.
 * @param target The file path to extract
 * @param dest The destination where the extracted files go to
 * @param func Returns if the entry should be copy. You can return false and handle it manually.
 */
export default async function unzip(
  target: string,
  dest: string,
  func?: ShouldCopyFunc
) {
  const rs = createReadStream(target)

  if (!func) {
    return rs.pipe(unzipper.Extract({ path: dest })).promise()
  }

  const transformer = new Transform({
    objectMode: true,
    transform: async (entry: Entry, _, cb) => {
      const shouldCopy = await func(entry)

      if (!shouldCopy) {
        await entry.autodrain().promise()
        return cb()
      }

      const destname = join(dest, entry.path)
      copy(entry, destname).then(cb)
    },
  })

  const transform = rs.pipe(unzipper.Parse()).pipe(transformer)
  return new Promise<void>((resolve, reject) => {
    transform.on('finish', resolve).on('error', reject)
  })
}
