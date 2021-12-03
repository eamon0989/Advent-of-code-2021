const input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`


/* sum all the forwards together 
sum the downs together and subtract the sum of
the ups
multiply the results together
*/

import fs from 'fs';
const data: string = fs.readFileSync('day2input.txt', 'utf8');
const instructions: string[] = data.split('\n');

const getDepth = (instructions: string[]): number => {
  let horPos = 0;
  let depth = 0;
  
  instructions.forEach(instruction => {
    const [ direction, distance ] = instruction.split(' ');
    if (direction === 'forward') {
      horPos += +distance;
    } else if (direction === 'down') {
      depth += +distance;
    } else if (direction === 'up') {
      depth -= +distance;
    }
  })

  return horPos * depth;
}

console.log(getDepth(instructions))