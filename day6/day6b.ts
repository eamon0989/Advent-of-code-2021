import fs from 'fs';

const initialFish = fs.readFileSync('input.txt', 'utf-8')
                      .split(',')
                      .map(Number);

// keep track of which fish are on which day
let cycle: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

initialFish.forEach(age => cycle[age] += 1);

let day = 0;

while (day < 256) {
  const [newFish, ...fishCycle] = cycle;
  cycle = [...fishCycle, newFish];
  cycle[6] += newFish;

  day += 1;
}

console.log(cycle.reduce((acc, fish) => acc + fish));