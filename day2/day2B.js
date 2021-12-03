"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;
/*
down X increases your aim by X units.
up X decreases your aim by X units.
forward X does two things:
It increases your horizontal position by X units.
It increases your depth by your aim multiplied by X.
*/
const fs_1 = __importDefault(require("fs"));
const data = fs_1.default.readFileSync('day2input.txt', 'utf8');
const instructions = data.split('\n');
const getDepth = (instructions) => {
    let aim = 0;
    let horPos = 0;
    let depth = 0;
    instructions.forEach(instruction => {
        const [direction, distance] = instruction.split(' ');
        if (direction === 'forward') {
            horPos += +distance;
            depth += (aim * +distance);
        }
        else if (direction === 'down') {
            aim += +distance;
        }
        else if (direction === 'up') {
            aim -= +distance;
        }
    });
    return horPos * depth;
};
console.log(getDepth(instructions));
