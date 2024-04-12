import { wordWrap } from '.';

describe('Word Wrap', () => {
  it('Should return an empty string when empty string or null or undefined is provided', async () => {
    expect(wordWrap('', 5)).toEqual({ text: '' });
    expect(wordWrap(null, 5)).toEqual({ text: '' });
    expect(wordWrap(undefined, 5)).toEqual({ text: '' });
  });

  it('Should return the provided text if column size is smaller that its length', async () => {
    expect(wordWrap('hello', 5)).toEqual({ text: 'hello' });
  });

  it('Should wrap the text when its length is greater than column size', async () => {
    expect(wordWrap('longword', 4)).toEqual({ text: 'long\nword' });
    expect(wordWrap('reallylongword', 4)).toEqual({
      text: 'real\nlylo\nngwo\nrd',
    });
  });

  it('Should prevail blank spaces', async () => {
    expect(wordWrap('abc def', 4)).toEqual({ text: 'abc\ndef' });
    expect(wordWrap('abc def ghi', 4)).toEqual({ text: 'abc\ndef\nghi' });
    expect(wordWrap(' abcdf', 4)).toEqual({ text: '\nabcd\nf' });
  });

  it("Shouldn't allow negative column sizes", async () => {
    expect(() => wordWrap('hello', -5)).toThrow(
      'Negative column sizes are not allowed'
    );
  });
});
