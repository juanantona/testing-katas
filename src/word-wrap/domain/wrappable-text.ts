import { ColumnSize, WrappableText } from '../types';

export function from(text: string | null | undefined): WrappableText {
  if (text == null) return from('');

  return { value: text };
}

export function fitsIn(text: WrappableText, columnSize: ColumnSize) {
  return text.value.length <= columnSize.value;
}

export function wrapIndex(text: WrappableText, columnSize: ColumnSize) {
  const whiteSpaceIndex = text.value.indexOf(' ');
  const shouldWrapByWhiteSpace =
    whiteSpaceIndex > -1 && whiteSpaceIndex < columnSize.value;

  return shouldWrapByWhiteSpace ? whiteSpaceIndex : columnSize.value;
}

export function unWrapIndex(text: WrappableText, columnSize: ColumnSize) {
  const whiteSpaceIndex = text.value.indexOf(' ');
  const shouldWrapByWhiteSpace =
    whiteSpaceIndex > -1 && whiteSpaceIndex < columnSize.value;

  return shouldWrapByWhiteSpace ? whiteSpaceIndex + 1 : columnSize.value;
}
