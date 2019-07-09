import Template from '~/models/Template'
import dirname from './dirname'
import unzip from './unzip'
import { join } from 'path'
import combine from './combine'
import { outputFile } from 'fs-extra'

export default async function generate(
  name: string,
  zipped: string,
  dest: string
) {
  const projectName = dirname(dest)
  const tpl = await Template.fromStdin(name, { name: projectName })

  await unzip(zipped, dest, async e => {
    if (!e.path.endsWith('.tpl')) {
      return true
    }

    const path = join(dest, e.path.split(/\.tpl$/).shift())
    const content = await combine(e).then(c => tpl.render(c))

    await outputFile(path, content)
  })
}
