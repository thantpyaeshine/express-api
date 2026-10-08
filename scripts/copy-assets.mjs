import { cpSync } from 'node:fs';

cpSync(new URL('../src/lib/', import.meta.url), new URL('../dist/src/lib/', import.meta.url), {
    recursive: true,
});
