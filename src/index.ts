import path from 'path';
import url from 'url';

const [exampleName, ...args] = process.argv.slice(2);

let runExample;
try {
  ({ run: runExample } = await import(
    path.join(
      path.dirname(url.fileURLToPath(import.meta.url)),
      '/prompts/few_shot.ts.ts',
    )
  ));
} catch (e) {
  throw new Error(`Could not load example ${exampleName}: ${e}`);
}

const maybePromise = runExample(args);

if (maybePromise instanceof Promise) {
  maybePromise.catch((e) => {
    console.error(`Example failed with:`);
    console.error(e);
    process.exit(1);
  });
}
