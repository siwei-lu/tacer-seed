import Template from '/models/Template'
import dirname from '/utils/dirname'
import copy, { CopyFileCallbackOption } from '/utils/copy'

const copyCallback = (tpl: Template) => ({
  path,
  content,
}: CopyFileCallbackOption) => {
  if (path.endsWith('.tpl')) {
    path = path.split(/\.tpl$/).shift()
    content = tpl.render(content)
  }

  return { path, content }
}

export default async function generate(
  name: string,
  path: string,
  dest: string
) {
  const projectName = dirname(dest)
  const tpl = await Template.fromStdin(name, { name: projectName })

  await copy(path, dest, copyCallback(tpl))
}
