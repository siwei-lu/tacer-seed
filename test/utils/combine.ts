import combine from '~/utils/combine'
import { Readable } from 'stream'
import { createReadStream } from 'fs'
import { resolve } from 'path'

describe('combine()', () => {
  it('should combine all the data of a stream to a string, then return it', async () => {
    const rs = new Readable()
    rs.push('Hello')
    rs.push(', ')
    rs.push('world')
    rs.push(null)

    const result = await combine(rs)
    result.should.eq('Hello, world')
  })
})
