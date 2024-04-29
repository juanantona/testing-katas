import { ColumnSize, WrappableText } from './types';

export function from(text: string | null | undefined): WrappableText {
  if (text == null) return from('');

  return { text };
}

export function wordWrap(text: WrappableText, columnSize: ColumnSize) {
  if (fitsIn(text, columnSize)) return text;

  const wrappedText = wrapText(text, columnSize);
  const unwrappedText = unWrapText(text, columnSize);
  return concat(wrappedText, wordWrap(unwrappedText, columnSize));
}

function fitsIn(text: WrappableText, columnSize: ColumnSize) {
  return text.text.length <= columnSize.value;
}

function concat(text1: WrappableText, text2: WrappableText) {
  return from([text1.text, text2.text].join('\n'));
}

function wrapText(text: WrappableText, columnSize: ColumnSize) {
  const wrappedIndex = wrapIndex(text, columnSize);
  return from(text.text.slice(0, wrappedIndex));
}

function wrapIndex(text: WrappableText, columnSize: ColumnSize) {
  const whiteSpaceIndex = indexOfWhiteSpace(text);
  const shouldWrap = shouldWrapByWhiteSpace(text, columnSize);
  return shouldWrap ? whiteSpaceIndex : columnSize.value;
}

function unWrapText(text: WrappableText, columnSize: ColumnSize) {
  const unWrappedIndex = unWrapIndex(text, columnSize);
  return from(text.text.slice(unWrappedIndex));
}

function unWrapIndex(text: WrappableText, columnSize: ColumnSize) {
  const whiteSpaceIndex = indexOfWhiteSpace(text);
  const shouldWrap = shouldWrapByWhiteSpace(text, columnSize);
  return shouldWrap ? whiteSpaceIndex + 1 : columnSize.value;
}

function shouldWrapByWhiteSpace(text: WrappableText, columnSize: ColumnSize) {
  const whiteSpaceIndex = indexOfWhiteSpace(text);
  return whiteSpaceIndex > -1 && whiteSpaceIndex < columnSize.value;
}

function indexOfWhiteSpace(text: WrappableText) {
  return text.text.indexOf(' ');
}
