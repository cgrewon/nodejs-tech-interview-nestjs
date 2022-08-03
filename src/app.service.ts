import { Injectable } from '@nestjs/common';
import { ResultWords, Status } from './app.interfaces';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getTransformedWords(
    words: string[] | string | null | undefined,
  ): ResultWords {
    const res = this.validWords(words);

    return {
      status: res === null ? Status.failed : Status.success,
      message: res === null ? 'Invalid request' : undefined,
      result: res === null ? undefined : res,
    } as ResultWords;
  }

  transformWords(words: string | Array<string>) {
    if (!Array.isArray(words) || words.length == 0) {
      console.log('Word array is empty.');
      return null;
    }

    return words
      .map((word, index) => {
        let newWord = word;
        if (newWord.length % 2 == 0 && newWord.length > 0) {
          // even length word
          newWord = newWord.split('').reverse().join('');
        }

        if ((index + 1) % 2 == 1) {
          // odd
          newWord = newWord
            .split('')
            .map((char, indexOfChar) =>
              (indexOfChar + 1) % 2 == 0 ? '*' : char,
            )
            .join('');
        }
        return newWord;
      })
      .join(' ');
  }

  validWords(words: string[] | string | null | undefined) {
    if (!words || words.length == 0) {
      return null;
    } else {
      const _words = Array.isArray(words) ? words : words.split(' ');
      return this.transformWords(_words);
    }
  }
}
