import fs from 'fs';

const data: string = fs.readFileSync('input.txt', 'utf8');
const bits: string[] = data.split('\n');

const countBits =(bits: string[]) => {
  let bitCount = [...bits[0]].map(bit => 0);

  bits.forEach(bit => {
    for (let i = 0; i < bit.length; i++) {
      if (bit[i] === '0') {
        bitCount[i] -= 1;
      } else if (bit[i] === '1') {
        bitCount[i] += 1;
      }
    }
  })

  const epsilonRateBinary = bitCount.map(bit => bit > 0 ? 1 : 0).join('');
  const gammaRateBinary = bitCount.map(bit => bit > 0 ? 0 : 1).join('');

  const epsilonRateDecimal = parseInt(epsilonRateBinary, 2);
  const gammaRateDecimal = parseInt(gammaRateBinary, 2);
 
  return epsilonRateDecimal * gammaRateDecimal;
}

console.log(countBits(bits));