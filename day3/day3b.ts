/* 
Take an array of strings
check the first char 
  if 1 is more common, discard the strings starting with 0
  if 0 is more common, discard strings starting with 1
  if they are equally common, discard strings starting with 0
repeat with the seconds char, 3rd etc 
  stop when there is only one number left
  convert that number to decimal, it's the oxygenGeneratorRating
*/

import fs from 'fs';

const data: string = fs.readFileSync('input.txt', 'utf8');
const bits: string[] = data.split('\n');

const getRating = (bits: string[], bitToKeep: string, bitToDiscard: string): number => {
  let filteredBits = [...bits];
  let index = 0;

  while (filteredBits.length > 1) {
    // an array of 0's the length of the binary number input
    let bitCount = [...bits[0]].map(_ => 0);
  
    // adds 1 for each 1, subtracts for each 0
    filteredBits.forEach(bit => {
      for (let i = 0; i < bit.length; i++) {
        if (bit[i] === '0') {
          bitCount[i] -= 1;
        } else if (bit[i] === '1') {
          bitCount[i] += 1;
        }
      }
    })
  
    // if num is greater than 0, there are more 1s, otherwise there are more 0s
    if (bitCount[index] >= 0) {
      filteredBits = filteredBits.filter(binary => binary[index] === bitToKeep);
    } else {
      filteredBits = filteredBits.filter(binary => binary[index] === bitToDiscard);
    }

    index += 1;
  }

  return parseInt(filteredBits[0], 2);
}

const getRatings = (bits: string[]) => {
  const oxygenGeneratorRating = getRating(bits, '1', '0');
  const c02ScrubberRating = getRating(bits, '0', '1');

  return oxygenGeneratorRating * c02ScrubberRating;
}

console.log(getRatings(bits));