import { Component, inject } from '@angular/core';
import { MemoryService } from '../../services/memory.service';
import { operations } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

const INITIAL_DISPLAY = '0';
const EMPTY_VALUE = '';

@Component({
  selector: 'app-calculator',
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly memoryService = inject(MemoryService);
  displayValue = INITIAL_DISPLAY;
  leftNumber = EMPTY_VALUE;
  rightNumber = EMPTY_VALUE;
  currentOperation = EMPTY_VALUE;
  operations = operations;
  private isOperationSelected = false;

  constructor() {
    const initialValue = this.route.snapshot.paramMap.get('value');
    if (initialValue) {
      this.displayValue = initialValue;
    }
  }

  updateValue(value: string) {
    if (value === '.' && this.displayValue.indexOf(value) > -1) return;

    if (this.displayValue === INITIAL_DISPLAY) {
      this.displayValue = value;
      return;
    }

    if (this.currentOperation !== EMPTY_VALUE && !this.isOperationSelected) {
      this.displayValue = value;
      this.isOperationSelected = true;
      return;
    }

    this.displayValue += value;
  }

  removeSingleDigit() {
    this.displayValue = this.displayValue.slice(
      0,
      this.displayValue.length - 1
    );
    if (this.displayValue.length === 0) {
      this.displayValue = INITIAL_DISPLAY;
    }
  }

  updateOperation(operation: string) {
    this.currentOperation = operation;
    if (this.leftNumber === EMPTY_VALUE) {
      this.leftNumber = this.displayValue;
    }
    if (
      this.currentOperation === operations.SQRT &&
      this.leftNumber !== EMPTY_VALUE
    ) {
      const result = Math.sqrt(Number(this.leftNumber));
      this.displayValue = String(result);
      this.memoryService.setMemory({
        id: uuidv4(),
        date: new Date().toDateString(),
        expression: `${this.currentOperation}(${this.leftNumber})`,
        result,
      });
    }
  }

  calculateExpression() {
    if (this.currentOperation === EMPTY_VALUE) return;
    const leftNumber = Number(this.leftNumber);
    this.rightNumber = this.displayValue;
    const rightNumber = Number(this.rightNumber);
    let result = 0;
    switch (this.currentOperation) {
      case operations.DIVISION: {
        result = leftNumber / rightNumber;
        break;
      }
      case operations.MULTIPLICATION: {
        result = leftNumber * rightNumber;
        break;
      }
      case operations.SUBSTRACTION: {
        result = leftNumber - rightNumber;
        break;
      }
      case operations.ADDITION: {
        result = leftNumber + rightNumber;
        break;
      }
      case operations.POWER: {
        result = Math.pow(leftNumber, rightNumber);
        break;
      }
      case operations.PERCENT: {
        result = leftNumber * (rightNumber / 100);
        break;
      }
      case operations.FACTORIAL: {
        const factorial = (n: number): number => {
          if (n < 2) return n;
          return n * factorial(n - 1);
        };
        result = factorial(leftNumber);
        break;
      }
      default: {
        result = 0;
        this.clearAll();
      }
    }
    this.displayValue = String(result);
    this.isOperationSelected = false;
    this.memoryService.setMemory({
      id: uuidv4(),
      date: new Date().toDateString(),
      expression: `${leftNumber} ${this.currentOperation} ${rightNumber}`,
      result,
    });
  }

  clearAll() {
    this.displayValue = INITIAL_DISPLAY;
    this.leftNumber = EMPTY_VALUE;
    this.rightNumber = EMPTY_VALUE;
    this.currentOperation = EMPTY_VALUE;
    this.isOperationSelected = false;
  }

  switchSign() {
    if (this.displayValue === INITIAL_DISPLAY) return;
    if (this.displayValue[0] === '-') {
      this.displayValue = this.displayValue.slice(1);
    } else {
      this.displayValue = '-' + this.displayValue;
    }
  }
}
