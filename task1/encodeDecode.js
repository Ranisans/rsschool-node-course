const { Transform } = require('stream');
const { StringDecoder } = require('string_decoder');

const exit = require('./exit');
const { ENCODE } = require('./constant');

const ctrlC = '\u0003';
const A = 'A'.charCodeAt(0);
const a = 'a'.charCodeAt(0);
const Z = 'Z'.charCodeAt(0);
const z = 'z'.charCodeAt(0);
const letterCount = 26;
const edge = 1;

class EncodeDecode extends Transform {
  constructor(options) {
    super(options);
    this.shift = options.action === ENCODE ? options.shift : -options.shift;
    this.shift = this.shift % letterCount;
    this._decoder = new StringDecoder('utf-8');
  }
  _transformLetter(char, min, max) {
    char += this.shift;
    if (char > max) {
      char = char - max + min - edge;
    } else if (char < min) {
      char += max - min + edge;
    }
    return char;
  }

  _encodeDecode(letter) {
    let char = letter.charCodeAt(0);
    if (char >= A && char <= Z) {
      char = this._transformLetter(char, A, Z);
    } else if (char >= a && char <= z) {
      char = this._transformLetter(char, a, z);
    }

    return String.fromCharCode(char);
  }

  _transform(chunk, encoding, callback) {
    if (encoding === 'buffer') {
      chunk = this._decoder.write(chunk);
      let result = '';
      if (chunk.length > 1) {
        for (let i = 0; i < chunk.length; i += 1) {
          result += this._encodeDecode(chunk[i]);
        }
      } else {
        result = this._encodeDecode(chunk);
      }
      chunk = result;
    }

    if (chunk === ctrlC) {
      exit(0);
    }

    callback(null, chunk);
  }
}

module.exports = EncodeDecode;
