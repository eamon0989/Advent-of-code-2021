/*
acedgfb: 8
cdfbe: 5
gcdfa: 2
fbcad: 3
dab: 7
cefabd: 9
cdfgeb: 6
eafb: 4
cagedb: 0
ab: 1
*/

import fs from 'fs';

const output: string[] = fs.readFileSync('input.txt', 'utf-8')
                            .split('\n')
                            .map(line => line.split('|'))
                            .map(arr => arr[1]);

const getCount = () => {
  let count = 0;
  output.forEach(line => {
    const matches = line.match(/\b\w{2}\b|\b\w{3}\b|\b\w{4}\b|\b\w{7}\b/g)

    count += matches?.length || 0;
  })

  console.log(count);
}

getCount()

