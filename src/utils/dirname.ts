import { resolve } from 'path'

export default function dirname(path: string) {
  const abs = resolve(path)
  return abs.split('/').pop()
}
