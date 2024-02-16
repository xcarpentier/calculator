import { Lexer, createToken } from "chevrotain";

export const NumberLiteral = createToken({
  name: "NumberLiteral",
  pattern: /[1-9]\d*/,
});

export const PlusMinusOperator = createToken({
  name: "PlusMinusOperator",
  pattern: Lexer.NA,
});

export const Plus = createToken({
  name: "Plus",
  pattern: /\+/,
  categories: PlusMinusOperator,
});

export const Minus = createToken({
  name: "Minus",
  pattern: /-/,
  categories: PlusMinusOperator,
});

export const MultiplicationOperator = createToken({
  name: "MultiplicationOperator",
  pattern: Lexer.NA,
});

export const Multi = createToken({
  name: "Multi",
  pattern: /\*/,
  categories: MultiplicationOperator,
});

const Div = createToken({
  name: "Div",
  pattern: /\//,
  categories: MultiplicationOperator,
});

export const Whitespace = createToken({
  name: "Whitespace",
  pattern: /\s+/,
  line_breaks: true,
  group: Lexer.SKIPPED,
});

//Order is important
export const allTokens = [
  Whitespace,
  Plus,
  Minus,
  Multi,
  Div,
  NumberLiteral,
  PlusMinusOperator,
  MultiplicationOperator,
];