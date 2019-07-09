import { Entry } from 'unzipper';
export declare type ShouldCopyFunc = (entry: Entry) => Promise<boolean>;
/**
 * unzip a zipped file.
 * @param target The file path to extract
 * @param dest The destination where the extracted files go to
 * @param func Returns if the entry should be copy. You can return false and handle it manually.
 */
export default function unzip(target: string, dest: string, func?: ShouldCopyFunc): Promise<void>;
