import fs from 'fs';

const data: string = fs.readFileSync('input.txt', 'utf-8');
console.log(data)