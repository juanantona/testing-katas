import * as ColumnSize from './domain/column-size';
import * as WrappableText from './domain/wrappable-text';

export const wordWrap = (
  text: string | null | undefined,
  columnSize: number
): string => {
  return WrappableText.wordWrap(
    WrappableText.from(text),
    ColumnSize.from(columnSize)
  );
};
