import { Readable } from 'stream'

export default async function combine(rs: Readable) {
  const strs = []
  rs.on('data', data => {
    strs.push(data)
  })

  return new Promise<string>((resolve, reject) => {
    rs.on('end', () => resolve(strs.join(''))).on('error', reject)
  })
}
