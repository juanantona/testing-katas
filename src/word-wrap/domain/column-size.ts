import { ColumnSize } from './types';

export function from(columnSize: number): ColumnSize {
  if (columnSize < 0) throw new Error('Negative column sizes are not allowed');

  return { value: columnSize };
}
