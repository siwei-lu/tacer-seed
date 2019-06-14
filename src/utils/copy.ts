import { promises as fs, existsSync } from 'fs'

export type CopyFileCallbackOption = {
  path: string
  content: string
}

export type CopyFileCallback = (
  option: CopyFileCallbackOption
) => CopyFileCallbackOption | false

export const isDir = (path: string) => fs.stat(path).then(s => s.isDirectory())

export async function mkdirIfNotExists(path: string) {
  if (!existsSync(path)) {
    await fs.mkdir(path)
  }
}

export async function copyFile(
  src: string,
  dest: string,
  cb?: CopyFileCallback
) {
  let content = await fs.readFile(src, 'utf8')

  if (cb) {
    const result = cb({ path: dest, content })
    if (!result) {
      return
    }

    dest = result.path
    content = result.content
  }

  await fs.writeFile(dest, content, 'utf8')
}

export async function copyDir(
  src: string,
  dest: string,
  cb?: CopyFileCallback
) {
  const subnames = await fs.readdir(src)
  const promises = subnames.map(name => {
    const subsrc = `${src}/${name}`
    const subdest = `${dest}/${name}`
    return copy(subsrc, subdest, cb)
  })

  await mkdirIfNotExists(dest)
  await Promise.all(promises)
}

export default async function copy(
  src: string,
  dest: string,
  cb?: CopyFileCallback
) {
  if (await isDir(src)) {
    await copyDir(src, dest, cb)
  } else {
    await copyFile(src, dest, cb)
  }
}
