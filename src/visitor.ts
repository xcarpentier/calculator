import { tokenMatcher } from "chevrotain";
import { CalculatorParser } from "./parser";
import { Multi, Plus } from "./tokens";

const parser = new CalculatorParser();
const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

export class CalculatorVisitor extends BaseCstVisitor {
  constructor() {
    super();
    this.validateVisitor();
  }

  expression(ctx: any) {
    return this.visit(ctx.additionExpression);
  }

  additionExpression(ctx: any) {
    let result = this.visit(ctx.lhs);

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand: any, index: number) => {
        const rhsValue = this.visit(rhsOperand);
        const operator = ctx.PlusMinusOperator[index];

        if (tokenMatcher(operator, Plus)) {
          result += rhsValue;
        } else {
          result -= rhsValue;
        }
      });
    }

    return result;
  }

  multiplicationExpression(ctx: any) {
    let result = this.visit(ctx.lhs);

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand: any, index: number) => {
        const rhsValue = this.visit(rhsOperand);
        const operator = ctx.MultiplicationOperator[index];

        if (tokenMatcher(operator, Multi)) {
          result *= rhsValue;
        } else {
          result /= rhsValue;
        }
      });
    }

    return result;
  }

  atomicExpression(ctx: any) {
    return parseInt(ctx.NumberLiteral[0].image, 10);

  }
}