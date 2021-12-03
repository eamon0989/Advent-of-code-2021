const fs = require('fs');
const data = fs.readFileSync('day1input.txt', 'utf8');
const days = data.split('\n').map(Number)

function countIncreases(days) {
  let count = 0;
  let previousSum

  for (let i = 1; i < days.length; i += 1) {
    let sum = days[i] + days[i + 1] + days[i + 2]
    if (sum > previousSum) {
      count += 1;
    }

    previousSum = sum;
  }

  return count;
}

console.log(countIncreases(days))
