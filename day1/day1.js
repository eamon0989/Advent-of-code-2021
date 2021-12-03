const fs = require('fs');
const data = fs.readFileSync('day1input.txt', 'utf8');
const days = data.split('\n')

function countIncreases(days) {
  let count = 0;
  
  days.forEach((day, index) => {
    if (Number(day) > Number(days[index - 1]) && index !== 0) {
      count += 1;
    }
  })

  return count;
}

console.log(countIncreases(days))
