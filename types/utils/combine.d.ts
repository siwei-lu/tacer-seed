/// <reference types="node" />
import { Readable } from 'stream';
export default function combine(rs: Readable): Promise<string>;
