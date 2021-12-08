/*
acedgfb: 8
cdfbe: 5
gcdfa: 2
fbcad: 3
dab: 7
cefabd: 9
cdfgeb: 6
eafb: 4
cagedb: 0
ab: 1

 aaaa 
b    c 
b    c 
 dddd 
e    f 
e    f 
 gggg 

acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf
acedgfb - 8 cdfbe gcdfa fbcad dab - 7 cefabd cdfgeb eafb - 4 cagedb ab - 1 | cdfeb fcadb cdfeb cdbaf

 dddd
e    a
e    a
 ffff
g    b
g    b
 cccc

 0 - a b c d e   g
 1 - a b
 2 - a   c d   f g 
 3 - a b c d   f
 4 - a b     e f
 5 -   b c d e f
 6 -   b c d e f g  
 7 - a b   d
 8 - a b c d e f g
 9 - a b c d e f  
*/

import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8')
                .split('\n')
                .map(line => line.split('|'))
                .map(arr => [arr[0], arr[1]])
                .map(arr => [arr[0].trim().split(' '), arr[1].trim().split(' ')]);;

const countChars = (array: string[]) => {
  interface Count {[key: string]: number}
  return array.join('').split('').reduce((obj: Count, char: string) => {
  obj[char] ? obj[char] += 1 : obj[char] = 1;
    return obj;
  }, {});
}

const getThree = (fiveChars: string[]) => {
  const charCount = countChars(fiveChars);

  let three = fiveChars.filter(string => {
    return string.split('').every(char => {
      return charCount[char] > 1;
    })
  })

  return three[0];
}

const getNine = (sixChars: string[], four: string, three: string): string => {
  const nineChars = Array.from(new Set([...four, ...three]));

  const nine = sixChars.filter(string => {
    const regex = new RegExp(`[${nineChars.join('')}]{6}`, 'g');
    return regex.test(string);
  })

  return nine[0];
}

const getTwo = (fiveChars: string[], e: string): string => {
  const two = fiveChars.filter(string => {
    const regex = new RegExp(`${e}`, 'g');
    return regex.test(string);
  })

  return two[0];
}

const getFive = (fiveChars: string[], three: string, two: string): string => {
  const five = fiveChars.filter(num => {
    return num !== three && num !== two;
  });

  return five[0];
}

const getZero = (sixChars: string[], nine: string, six: string): string => {
  return sixChars.filter(num => {
    return num !== nine && num !== six;
  })[0];
}

const getSix = (sixChars: string[], five: string, e: string) => {
  const uniqueSixChars = Array.from(new Set([...five, e]));

  const six = sixChars.filter(string => {
    const regex = new RegExp(`[${uniqueSixChars.join('')}]{6}`, 'g');
    return regex.test(string);
  })

  return six[0];
}

let total = 0;

const getNumbers = () => {
  input.forEach(line => {
    const [ signals, values ] = line;

    interface Num {[key: number]: string}
    let numbers: Num = {
      0: '',
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: '',
      9: ''
    }
    const charCount = countChars(signals);
    let e = '';

    for (let char in charCount) {
      if (charCount[char] === 4) {
        e = char;
      }
    }

    let fiveChars: string[] = [];
    let sixChars: string[] = [];

    signals.forEach((signal, index) => {
      if (/\b\w{2}\b/.test(signal)) {
        numbers[1] = signal;
      } else if (/\b\w{3}\b/.test(signal)) {
        numbers[7] = signal;
      } else if (/\b\w{4}\b/.test(signal)) {
        numbers[4] = signal;
      } else if (/\b\w{7}\b/.test(signal)) {
        numbers[8] = signal;
      } else if (/\b\w{5}\b/.test(signal)) {
        fiveChars.push(signal);
      } else if (/\b\w{6}\b/.test(signal)) {
        sixChars.push(signal);
      }
    })

    numbers[3] = getThree(fiveChars);
    numbers[9] = getNine(sixChars, numbers[4], numbers[3]);
    numbers[2] = getTwo(fiveChars, e);
    numbers[5] = getFive(fiveChars, numbers[3], numbers[2]);
    numbers[6] = getSix(sixChars, numbers[5], e);
    numbers[0] = getZero(sixChars, numbers[9], numbers[6]);

    let inputNums: string[] = [];

    values.forEach(value => {
      for (let num in numbers) {
        const regex = new RegExp(`\\b[${value}]{` + value.length + `}\\b`, 'g');
        if (regex.test(numbers[num])) {
          inputNums.push(num);
        }
      }
    })

    total += Number(inputNums.join(''));
  })

}

getNumbers();

console.log(total);