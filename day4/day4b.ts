/* 
Import text
First line of comma-separated numbers is the numbers that are called one by one in order
an empty line separates each bingo board
each bingo board consists of 5 lines of 5 numbers

each number is chosen in sequence
all matching numbers on boards are 'marked'
if all numbers in a row or column are marked, that board wins

get the sum of the 'UNMARKED' numbers in the winning board
multiply the sum by the last number that was called

use an object
  key is index of a board
  value is 0

loop over each board until finished
  store the count of numbers called or false if board is not finised

loop over object, checking which board finishes with fewest steps


brute force method:

loop over each board
  loop over each row, marking the number
  when a number is marked, incriment the 'column count' index by 1
  loop over each row, checking if the row is finished
  check if 'column count' has reached 5

*/

import fs from 'fs';

const data: string = fs.readFileSync('input.txt', 'utf-8');
const divided: string[] = data.split(/^\s*$/gm);
const [ numbersString, ...boards ] = divided;
const numbers = numbersString.split(',');

let numbersUntilBingo: any = {}

// checks how many numbers it takes for each board to get to bingo
const countNumbersUntilBingo = (boards: string[]) => {
  boards.forEach((board, boardIndex) => {
    let lines = board 
                  .split('\n')
                  .filter(str => str)
                  .map(line => line.split(' '))
                  .map(line => line.filter(char => char.length > 0));

    let columnCount = [...lines[0]].map(_ => 0);

    let index = 0;
    while (!numbersUntilBingo[boardIndex] && index < numbers.length) {
      let num = numbers[index];

      lines.forEach(line => {
        if (line.includes(num)) {
          let lineIndex = line.indexOf(num);
          line[lineIndex] = 'x';
          columnCount[lineIndex] += 1;
          
          if (columnCount.includes(5) || line.filter(num => num !=='x').length === 0) {
            // stores how many nums it took a board to get bingo, the numbers left unmarked 
            // and the last num called
            numbersUntilBingo[boardIndex] = [index + 1, lines, Number(num)];
          }
        }
      })

      index += 1;
    }
  })
}

const getLosingBoard = (numbersUntilBingo: string[]): string | undefined => {
  let lowestNum = 0;
  let losingBoard;

  for (let prop in numbersUntilBingo) {
    if (+numbersUntilBingo[prop][0] > lowestNum) {
      lowestNum = +numbersUntilBingo[prop][0];
      losingBoard = prop;
    }
  }

  return losingBoard;
}

const getScoreOfLosingBoard = (losingBoard: string | undefined): number | false => {
  if (!losingBoard) return false;

  let array: [][] = numbersUntilBingo[losingBoard][1];
  let finalNum = numbersUntilBingo[losingBoard][2];
  let sum = 0;
  
  array.forEach(line => {
    line.forEach(num => {
      if (!isNaN(num)) {
        sum += Number(num);
      }
    })
  })

  return sum * finalNum;
}

countNumbersUntilBingo(boards);
const losingBoard = getLosingBoard(numbersUntilBingo);
const score = getScoreOfLosingBoard(losingBoard);
console.log(score);