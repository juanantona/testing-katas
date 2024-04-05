import { wordWrap } from '.';

describe('Word Wrap', () => {
  it('Should return an empty string when empty string or null or undefined is provided', async () => {
    expect(wordWrap('', 5)).toBe('');
    expect(wordWrap(null, 5)).toBe('');
    expect(wordWrap(undefined, 5)).toBe('');
  });

  it('Should return the provided text if column size is smaller that its length', async () => {
    expect(wordWrap('hello', 5)).toBe('hello');
  });

  it('Should wrap the text when its length is greater than column size', async () => {
    expect(wordWrap('longword', 4)).toBe('long\nword');
    expect(wordWrap('reallylongword', 4)).toBe('real\nlylo\nngwo\nrd');
  });

  it('Should prevail blank spaces', async () => {
    expect(wordWrap('abc def', 4)).toBe('abc\ndef');
    expect(wordWrap('abc def ghi', 4)).toBe('abc\ndef\nghi');
    expect(wordWrap(' abcdf', 4)).toBe('\nabcd\nf');
  });

  it("Shouldn't allow negative column sizes", async () => {
    expect(() => wordWrap('hello', -5)).toThrow(
      'Negative column sizes are not allowed'
    );
  });
});
