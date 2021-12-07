/*
Each crapPos represents it's position
All crabs must end up at the same position
It takes 1 fuel per position change 
Find the cheapest position

Find highest and lowest position
For each position, find the difference between crabPost and currentPos
Sum them all together
Repeat for all possible positions

Part B:

Each move takes 1 more fuel than the previous move
E.g. 
move 1: 1, 
move 2: 2, 
move 3: 3
move 4: 4
move 5: 5

Fuel is the sum of all moves
*/

import fs from 'fs';
interface posFuelCostObj {[key: number]: number};

const crabPos: number[] = fs.readFileSync('input.txt', 'utf-8')
                          .split(',')
                          .map(Number);

function calculateFuel(numOfMoves: number): number {
  let totalFuelCost = 0;

  for (let fuelCostPerMove = 0; fuelCostPerMove <= numOfMoves; fuelCostPerMove += 1) {
    totalFuelCost += fuelCostPerMove;
  }

  return totalFuelCost;
}

const calculateCheapestFuelCost = (posFuelCost: posFuelCostObj) => {
  let cheapestPos = '0';
  let cheapestFuelCost = posFuelCost[0];
  
  for (let position in posFuelCost) {
    if (posFuelCost[position] < cheapestFuelCost) {
      cheapestFuelCost = posFuelCost[position];
      cheapestPos = position;
    }
  }

  console.log(cheapestFuelCost);
}

const calculatePositionFuelCost = (crabPos: number[]) => {
  let posFuelCost: posFuelCostObj = {}

  const [ lowest, highest ] = [Math.min(...crabPos), Math.max(...crabPos)];

  crabPos.forEach(pos => {
    for (let destinationPos = lowest; destinationPos < highest; destinationPos += 1) {
      const difference = Math.abs(pos - destinationPos);
  
      const fuel = calculateFuel(difference);
  
      posFuelCost[destinationPos] ? posFuelCost[destinationPos] += fuel : posFuelCost[destinationPos] = fuel;
    }
  })
  
  calculateCheapestFuelCost(posFuelCost);
}

calculatePositionFuelCost(crabPos);