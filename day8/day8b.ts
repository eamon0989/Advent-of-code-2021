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

interface Num {[key: number]: string};
interface Count {[key: string]: number};
let total = 0;

const countChars = (array: string[]) => {
  return array.join('').split('').reduce((obj: Count, char: string) => {
  obj[char] ? obj[char] += 1 : obj[char] = 1;
    return obj;
  }, {});
}

const getThree = (fiveCharNums: string[]) => {
  const charCount = countChars(fiveCharNums);

  let three = fiveCharNums.filter(string => {
    return string.split('').every(char => {
      return charCount[char] > 1;
    })
  })

  return three[0];
}

const getTwo = (fiveCharNums: string[], e: string): string => {
  const two = fiveCharNums.filter(string => {
    const regex = new RegExp(`${e}`, 'g');
    return regex.test(string);
  })

  return two[0];
}

// given 2 numbers, return the remaining number
const returnThirdOption = (arrayOfNumbers: string[], num1: string, num2: string): string => {
  const num3 = arrayOfNumbers.filter(num => {
    return num !== num1 && num !== num2;
  });

  return num3[0];
}

// return the match from the 6 char nums - 9, 6, 0
const getNumberFrom6Chars = (sixCharNums: string[], num1: string, num2: string) => {
  const uniqueChars = Array.from(new Set([...num1, num2]));

  const num3 = sixCharNums.filter(string => {
    const regex = new RegExp(`[${uniqueChars.join('')}]{6}`, 'g');
    return regex.test(string);
  })

  return num3[0];
}

// e is the least used letter, the bottom left side
const getE = (signals: string[]): string => {
  const charCount = countChars(signals);
  
  let e = '';
  for (let char in charCount) {
    if (charCount[char] === 4) {
      return char;
    }
  }

  return e;
}

// adds value of each line to final total
const getTotal = (values: string[], numbers: Num) => {
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
}

const getNumbers = () => {
  input.forEach(line => {
    const [ signals, values ] = line;

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

    const e = getE(signals);
    let fiveCharNums: string[] = [];
    let sixCharNums: string[] = [];

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
        fiveCharNums.push(signal);
      } else if (/\b\w{6}\b/.test(signal)) {
        sixCharNums.push(signal);
      }
    })

    numbers[3] = getThree(fiveCharNums);
    numbers[9] = getNumberFrom6Chars(sixCharNums, numbers[4], numbers[3]);
    numbers[2] = getTwo(fiveCharNums, e);
    numbers[5] = returnThirdOption(fiveCharNums, numbers[3], numbers[2]);
    numbers[6] = getNumberFrom6Chars(sixCharNums, numbers[5], e);
    numbers[0] = returnThirdOption(sixCharNums, numbers[9], numbers[6]);

    getTotal(values, numbers);
  })
}

getNumbers();
console.log(total);