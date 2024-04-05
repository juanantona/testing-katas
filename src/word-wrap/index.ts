export const wordWrap = (text: string, columnSize: number): string => {
  if (text.length > columnSize) {
    let column: string, rest: string;
    const firstWhiteSpaceIndex = text.indexOf(' ');
    if (firstWhiteSpaceIndex > -1 && firstWhiteSpaceIndex < columnSize) {
      column = text.slice(0, firstWhiteSpaceIndex);
      rest = text.slice(firstWhiteSpaceIndex + 1);
    } else {
      column = text.slice(0, columnSize);
      rest = text.slice(columnSize);
    }
    return [column, wordWrap(rest, columnSize)].join('\n');
  }
  return text;
};
