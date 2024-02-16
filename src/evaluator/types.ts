export interface Evaluator<T> {
  evaluate: (expression: string) => T;
}