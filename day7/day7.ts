/*
Each crapPos represents it's position
All crabs must end up at the same position
It takes 1 fuel per position change 
Find the cheapest position

Find highest and lowest position
For each position, find the difference between crabPost and currentPos
Sum them all together
Repeat for all possible positions
*/

import fs from 'fs';

const crabPos: number[] = fs.readFileSync('input.txt', 'utf-8')
                          .split(',')
                          .map(Number);

interface posFuelCostObj {[key: number]: number}
let posFuelCost: posFuelCostObj = {}

const [ lowest, highest ] = [Math.min(...crabPos), Math.max(...crabPos)];

crabPos.forEach(pos => {
  for (let destinationPos = lowest; destinationPos < highest; destinationPos += 1) {
    const difference = Math.abs(pos - destinationPos);

    posFuelCost[destinationPos] ? posFuelCost[destinationPos] += difference : posFuelCost[destinationPos] = difference;
  }
})

let cheapestPos = '0';
let cheapestFuelCost = posFuelCost[0];

for (let position in posFuelCost) {
  if (posFuelCost[position] < cheapestFuelCost) {
    cheapestFuelCost = posFuelCost[position];
    cheapestPos = position;
  }
}

console.log(cheapestPos);
console.log(cheapestFuelCost);