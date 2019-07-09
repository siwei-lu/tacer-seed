import { createInterface } from 'readline'
import { Readable, Writable } from 'stream'

type Option = {
  input: Readable
  output: Writable
}

export default async function line(
  question: string,
  preset: string = ''
): Promise<string> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  if (preset) {
    question += `(${preset}) `
  }

  const answer: string =
    (await new Promise((res, rej) =>
      rl.question(question, ans => {
        rl.close()
        res(ans)
      })
    )) || preset

  return answer
}
