import * as ColumnSize from './domain/column-size';
import * as WrappableText from './domain/wrappable-text';

export const wordWrapOld = (
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

export const wordWrap = (
  text: string | null | undefined,
  columnSize: number
): string => {
  return wordWrapNonPrimitives(
    WrappableText.from(text),
    ColumnSize.from(columnSize)
  );
};

export const wordWrapNonPrimitives = (
  text: ReturnType<typeof WrappableText.from>,
  columnSize: ReturnType<typeof ColumnSize.from>
): string => {
  if (WrappableText.fitsIn(text, columnSize)) return text.value;

  const wrappedIndex = WrappableText.wrapIndex(text, columnSize);
  const unWrappedIndex = WrappableText.unWrapIndex(text, columnSize);

  const wrappedText = text.value.slice(0, wrappedIndex);
  const unwrappedText = text.value.slice(unWrappedIndex);
  return [wrappedText, wordWrap(unwrappedText, columnSize.value)].join('\n');
};
