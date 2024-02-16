import { Lexer } from "chevrotain";
import { CalculatorParser } from "../parser";
import { allTokens } from "../tokens";
import { CalculatorVisitor } from "../visitor";
import { Evaluator } from "./types";

class Calculator implements Evaluator<number> {
  private lexer: Lexer;
  private parser: CalculatorParser;
  private visitor: CalculatorVisitor;
  constructor() {
    this.lexer = new Lexer(allTokens);
    this.parser = new CalculatorParser();
    this.visitor = new CalculatorVisitor();
  }
  evaluate(expression: string): number {
    const { tokens } = this.lexer.tokenize(expression);
    this.parser.input = tokens;
    const cst = this.parser.expression();
    const result = this.visitor.visit(cst);
    return result;
  }
}

export const CalculatorEvaluator = new Calculator();