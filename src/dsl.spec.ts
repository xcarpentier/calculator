import { CalculatorEvaluator } from './evaluator/Calculator';

describe('calculator', () => {
  it.each`
    input | expected
    ${"36+8-2"} | ${42}
    ${"36 + 8 - 2"} | ${42}
    ${"36 + 8 - 2 \n + 1"} | ${43}
    ${"2*3"} | ${6}
    ${"1+1"} | ${2}
    ${"2*3+2"} | ${8}
    `('parses and calculate expression $input = $expected', ({ input, expected }) => {
    const result = CalculatorEvaluator.evaluate(input);
    expect(result).toEqual(expected);
  }
  );
});
