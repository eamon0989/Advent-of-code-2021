import fs from 'fs';
const data: string = fs.readFileSync('day1input.txt', 'utf8');
const days: number[] = data.split('\n').map(Number)

function countIncreases(days: number[]): number {
  let count: number = 0;
  let previousSum: number = 0;

  for (let i = 1; i < days.length; i += 1) {
    let sum: number = days[i] + days[i + 1] + days[i + 2]
    if (sum > previousSum) {
      count += 1;
    }

    previousSum = sum;
  }

  return count;
}

console.log(countIncreases(days))
