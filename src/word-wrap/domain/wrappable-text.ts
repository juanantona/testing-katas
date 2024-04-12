import { ColumnSize, WrappableText } from '../types';

export function from(text: string | null | undefined): WrappableText {
  if (text == null) return from('');

  return { value: text };
}

export function fitsIn(text: WrappableText, columnSize: ColumnSize) {
  return text.value.length <= columnSize.value;
}

export function wrapText(text: WrappableText, columnSize: ColumnSize) {
  const wrappedIndex = wrapIndex(text, columnSize);
  return text.value.slice(0, wrappedIndex);
}

export function unWrapText(text: WrappableText, columnSize: ColumnSize) {
  const unWrappedIndex = unWrapIndex(text, columnSize);
  return text.value.slice(unWrappedIndex);
}

function indexOfWhiteSpace(text: WrappableText) {
  return text.value.indexOf(' ');
}

function shouldWrapByWhiteSpace(text: WrappableText, columnSize: ColumnSize) {
  const whiteSpaceIndex = indexOfWhiteSpace(text);
  return whiteSpaceIndex > -1 && whiteSpaceIndex < columnSize.value;
}

function wrapIndex(text: WrappableText, columnSize: ColumnSize) {
  const whiteSpaceIndex = indexOfWhiteSpace(text);
  const shouldWrap = shouldWrapByWhiteSpace(text, columnSize);
  return shouldWrap ? whiteSpaceIndex : columnSize.value;
}

function unWrapIndex(text: WrappableText, columnSize: ColumnSize) {
  const whiteSpaceIndex = indexOfWhiteSpace(text);
  const shouldWrap = shouldWrapByWhiteSpace(text, columnSize);
  return shouldWrap ? whiteSpaceIndex + 1 : columnSize.value;
}
