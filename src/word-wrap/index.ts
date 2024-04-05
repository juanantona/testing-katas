export const wordWrap = (
  text: string | null | undefined,
  columnSize: number
): string => {
  if (columnSize < 0) throw new Error('Negative column sizes are not allowed');
  if (!text) return '';
  if (text.length <= columnSize) return text;

  const { wrappedIndex, unwrappedIndex } = getSplitIndexes(text, columnSize);
  const wrappedText = text.slice(0, wrappedIndex);
  const unwrappedText = text.slice(unwrappedIndex);
  return [wrappedText, wordWrap(unwrappedText, columnSize)].join('\n');
};
const getSplitIndexes = (text: string, columnSize: number) => {
  const whiteSpaceIndex = text.indexOf(' ');
  const shouldWrapByWhiteSpace =
    whiteSpaceIndex > -1 && whiteSpaceIndex < columnSize;

  const wrappedIndex = shouldWrapByWhiteSpace ? whiteSpaceIndex : columnSize;
  const unwrappedIndex = shouldWrapByWhiteSpace
    ? whiteSpaceIndex + 1
    : columnSize;
  return { wrappedIndex, unwrappedIndex };
};
