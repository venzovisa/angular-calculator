import { Component, inject } from '@angular/core';
import { MemoryService } from '../../services/memory.service';

@Component({
  selector: 'app-calculator',
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  memoryService = inject(MemoryService);
  displayValue = '0';
  leftNumber = '';
  rightNumber = '';
  currentOperation = '';
  private isOperationSelected = false;

  constructor() {
    this.memoryService.getMemory().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  updateValue(value: string) {
    if (value === '.' && this.displayValue.indexOf(value) > -1) return;

    if (this.displayValue === '0') {
      this.displayValue = value;
      return;
    }

    if (this.currentOperation !== '' && !this.isOperationSelected) {
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
      this.displayValue = '0';
    }
  }
  updateOperation(operation: string) {
    this.currentOperation = operation;
    if (this.leftNumber === '') {
      this.leftNumber = this.displayValue;
    }
  }
  calculateExpression() {
    if (this.currentOperation === '') return;
    const leftNumber = Number(this.leftNumber);
    this.rightNumber = this.displayValue;
    const rightNumber = Number(this.rightNumber);
    let result = 0;
    switch (this.currentOperation) {
      case '/': {
        result = leftNumber / rightNumber;
        break;
      }
      case 'X': {
        result = leftNumber * rightNumber;
        break;
      }
      case '-': {
        result = leftNumber - rightNumber;
        break;
      }
      case '+': {
        result = leftNumber + rightNumber;
        break;
      }
      case '^': {
        result = Math.pow(leftNumber, rightNumber);
        break;
      }
      default: {
        result = 0;
      }
    }
    this.displayValue = String(result);
    this.isOperationSelected = false;
    this.memoryService.setMemory({
      date: new Date().toDateString(),
      expression: `${leftNumber} ${this.currentOperation} ${rightNumber}`,
      result,
    });
  }
  clearAll() {
    this.displayValue = '0';
    this.leftNumber = '';
    this.rightNumber = '';
    this.currentOperation = '';
    this.isOperationSelected = false;
  }
  switchSign() {
    if (this.displayValue === '0') return;
    if (this.displayValue[0] === '-') {
      this.displayValue = this.displayValue.slice(1);
    } else {
      this.displayValue = '-' + this.displayValue;
    }
  }
}
