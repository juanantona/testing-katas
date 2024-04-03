export const wordWrap = (text: string, columnSize: number): string => {
  if (text.length > columnSize) {
    const column = text.slice(0, columnSize);
    const rest = text.slice(columnSize);
    return [column, wordWrap(rest, columnSize)].join('\n');
  }
  return text;
};
