import { wordWrap } from '.';

// wordWrap('',5) ⇒ ''
// wordWrap('hello',5) ⇒ 'hello'
// wordWrap('longword',4) ⇒ 'long\nword'
// wordWrap('reallylongword',4) ⇒ 'real\nlylo\nngwo\nrd'
// wordWrap('abc def',4) ⇒ 'abc\ndef'
// wordWrap('abc def ghi',4) ⇒ 'abc\ndef\nghi'
// wordWrap(' abcdf',4) ⇒ '\nabcd\nf'
// wordWrap(null,5) ⇒ ''
// wordWrap('hello',-5) ⇒ throw exception

describe('Word Wrap', () => {
  it('Should return the text splitted with break lines', async () => {
    expect(wordWrap('', 5)).toBe('');
    expect(wordWrap('hello', 5)).toBe('hello');
    expect(wordWrap('longword', 4)).toBe('long\nword');
    expect(wordWrap('reallylongword', 4)).toBe('real\nlylo\nngwo\nrd');
  });
});
