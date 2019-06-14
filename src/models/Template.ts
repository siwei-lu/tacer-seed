import line from '/utils/line'
import handlebars from 'handlebars'

export interface ITemplate {
  name?: string
  description?: string
  repository?: string
  author?: string
  license?: string
  template?: string
  version?: string
}

export default class Template implements ITemplate {
  name: string
  description: string
  repository: string
  author: string
  license: string
  template: string
  version: string

  constructor({ ...props }: ITemplate) {
    Object.assign(this, props)
  }

  render(content: string): string {
    return handlebars.compile(content)(this)
  }

  static async fromStdin(template: string, { ...preset }: ITemplate) {
    const name = await line('package name: ', preset.name)
    const version = await line('version: ', '0.1.0')
    const description = await line('description: ')
    const repository = await line('git repository: ')
    const author = await line('author: ')
    const license = await line('license: ', 'MIT')

    return new this({
      template,
      name,
      version,
      description,
      repository,
      author,
      license,
    })
  }
}
