import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const VIDEO = path.join(__dirname, 'test.mp4');
export const DOCUMENT = path.join(__dirname, 'test-document.txt');
