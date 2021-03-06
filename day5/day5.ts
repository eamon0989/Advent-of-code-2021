/* 
Find the max x and y numbers
  split each line of input into 2 arrays, [x, y], [x, y]
  loop through all the arrays, find the max x and max y
create a diagram of dots x wide and y deep
  create an empty array
  create an array of . x wide and push
  copy that array y times in the original array
check if each input row is hor/ver (not diagonal)
  check if x === x or y === y
if so, change the dots from x to x or y to y to numbers
  if x === x, get the start and end y numbers
  find array start y, change . to number at index x
  repeat until end y
  if a number already exists, increment the number
count the amount of 2's or higher in the diagram
  loop over the arrays, counting the numbers 2 or higher
*/

import fs from 'fs';

const data: string = fs.readFileSync('input.txt', 'utf-8');
// type segments = [[[startX: number, startY: number],[endX: number, endY: number]]]
const segments = data.split('\n')
                  .map(str => str.split(' -> '))
                  .map(arr => [arr[0].split(',').map(Number), arr[1].split(',').map(Number)]);

const getMaxXAndMaxY = (segments: number[][][]): [number, number] => {
  let maxX = 0;
  let maxY = 0;

  segments.forEach(segment => {
    segment.forEach(seg => {
      if (seg[0] > maxX) {
        maxX = seg[0];
      } else if (seg[1] > maxY) {
        maxY = seg[1];
      } 
    });
    });

    return [maxX, maxY];
};

const maxes = getMaxXAndMaxY(segments);

const createDiagram = (maxes: [number, number]): string[][] => {
  const [ maxX, maxY ] = maxes;

  const diagram: string[][] = [];
  for (let i = 0; i <= maxY; i++) {
    diagram.push(`${'.'.repeat(maxX + 1)}`.split(''));
  }

  return diagram;
};

const diagram = createDiagram(maxes);

const getInBetweenNumbers = (start: number, end: number): number[] => {
  const sortedNums = [start, end].sort((a, b) => a - b);
  const nums = [sortedNums[0]];

  for (let i = sortedNums[0] + 1; i < sortedNums[1]; i++) {
    nums.push(i);
  }

  nums.push(sortedNums[1]);

  return nums;
};

const showLines = (diagram: string[][], segments: number[][][]) => {
  segments.forEach(segment => {
    const [[ startX, startY ], [ endX, endY ]] = segment;

    if (!isDiagonal(segment)) {
      if (startX === endX) {
        const indexesToChange = getInBetweenNumbers(startY, endY);
        const columnIndex = startX;

        diagram.forEach((row, index) => {
          if (indexesToChange.includes(index)) {
            const charToChange = row[columnIndex];
            if (charToChange === '.') {
              row[columnIndex] = '1';
            } else if (/\d/.test(charToChange)) {
              row[columnIndex] = `${Number(charToChange) + 1}`;
            }
          }
        });

      } else if (startY === endY) {
        const indexesToChange = getInBetweenNumbers(startX, endX);
        const row = diagram[startY];

        indexesToChange.forEach(index => {

          if (row[index] === '.') {
            row[index] = '1';
          } else if (/\d/.test(row[index])) {
            row[index] = `${Number(row[index]) + 1}`;
          }
        });

        diagram[startY] = row;
      }
    }
  });

  return diagram;
};

const isDiagonal = (segment: number[][]): boolean => {
  if (segment[0][0] === segment[1][0]) return false;
  if (segment[0][1] === segment[1][1]) return false;
  return true;
};

showLines(diagram, segments);

const getOverlap = () => {
  const nums = diagram.flat().filter(char => /[2-9]/.test(char));
  return nums.length;
};

const overlap = getOverlap();

console.log(overlap);