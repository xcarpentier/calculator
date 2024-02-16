import { CstParser } from "chevrotain";
import { MultiplicationOperator, NumberLiteral, PlusMinusOperator, allTokens } from "./tokens";

export class CalculatorParser extends CstParser {
  constructor(options?: any) {
    super(allTokens, options);
    this.performSelfAnalysis();
  }

  atomicExpression = this.RULE("atomicExpression", () => {
    this.CONSUME(NumberLiteral);
  });

  additionExpression = this.RULE("additionExpression", () => {
    this.SUBRULE(this.multiplicationExpression, { LABEL: "lhs" });
    this.MANY(() => {
      this.CONSUME(PlusMinusOperator);
      this.SUBRULE2(this.multiplicationExpression, { LABEL: "rhs" });
    });
  })

  multiplicationExpression = this.RULE("multiplicationExpression", () => {
    this.SUBRULE(this.atomicExpression, { LABEL: "lhs" });
    this.MANY(() => {
      this.CONSUME(MultiplicationOperator);
      this.SUBRULE2(this.atomicExpression, { LABEL: "rhs" });
    });
  })

  expression = this.RULE("expression", () => {
    this.SUBRULE(this.additionExpression);
  });
}