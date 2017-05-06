#! /usr/bin/env node

const toc = require('markdown-toc');

const from = parseInt(process.argv[2], 10);
const to = parseInt(process.argv[3], 10);

if (!(from < to && to < 7)) {
  process.exit(1);
}

const space = (count) => {
  let string = '';
  for (let i = 0; i < count; i += 1) {
    string += ' ';
  }
  return string;
};

process.stdin.on('data', (chunk) => {
  toc(chunk.toString()).json.forEach(({ lvl, content, slug }) => {
    if (from > lvl || lvl > to) return;
    process.stdout.write(`${space((lvl - from) * 4)}- [${content}](#${slug})\n`);
  });
});
