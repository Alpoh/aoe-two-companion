#!/usr/bin/env node
const fs = require('fs');
const ts = require('typescript');

function findCommentRanges(sourceText) {
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, false);
  scanner.setText(sourceText);
  const ranges = [];
  let kind = scanner.scan();
  while (kind !== ts.SyntaxKind.EndOfFileToken) {
    if (
      kind === ts.SyntaxKind.SingleLineCommentTrivia ||
      kind === ts.SyntaxKind.MultiLineCommentTrivia
    ) {
      ranges.push(scanner.getTokenPos());
    }
    kind = scanner.scan();
  }
  return ranges;
}

function lineOf(sourceText, position) {
  return sourceText.slice(0, position).split('\n').length;
}

const files = process.argv.slice(2);
let hasComments = false;

for (const file of files) {
  const sourceText = fs.readFileSync(file, 'utf8');
  const ranges = findCommentRanges(sourceText);
  for (const position of ranges) {
    hasComments = true;
    console.error(
      `${file}:${lineOf(sourceText, position)}: comments are not allowed (Clean Code rule in CLAUDE.md)`,
    );
  }
}

process.exit(hasComments ? 1 : 0);
