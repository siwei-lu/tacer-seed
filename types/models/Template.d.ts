export interface ITemplate {
    name?: string;
    description?: string;
    repository?: string;
    author?: string;
    license?: string;
    template?: string;
    version?: string;
}
export default class Template implements ITemplate {
    name: string;
    description: string;
    repository: string;
    author: string;
    license: string;
    template: string;
    version: string;
    constructor({ ...props }: ITemplate);
    render(content: string): string;
    static fromStdin(template: string, { ...preset }: ITemplate): Promise<Template>;
}
