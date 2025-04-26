import { Injectable } from '@angular/core';
import { operations } from '../../models';

type OperationFunction = (left: number, right: number) => number;

const operationMap: Record<string, OperationFunction> = {
  [operations.DIVISION]: (left, right) => {
    if (right === 0) {
      throw new Error('Invalid operation');
    }
    return left / right;
  },
  [operations.MULTIPLICATION]: (left, right) => left * right,
  [operations.SUBSTRACTION]: (left, right) => left - right,
  [operations.ADDITION]: (left, right) => left + right,
  [operations.POWER]: (left, right) => Math.pow(left, right),
  [operations.PERCENT]: (left, right) => left * (right / 100),
  [operations.FACTORIAL]: (left) => {
    const factorial = (n: number): number => {
      if (n < 2) return n;
      return n * factorial(n - 1);
    };
    return factorial(left);
  },
};

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  calculate(left: number, right: number, operation: string): number {
    const operationFn = operationMap[operation];
    if (!operationFn) {
      throw new Error('Invalid operation');
    }
    return operationFn(left, right);
  }

  calculateSquareRoot(value: number): number {
    return Math.sqrt(value);
  }
}
