import { Injectable } from '@angular/core';

const INITIAL_DISPLAY = '0';
const EMPTY_VALUE = '';

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
  private displayValue = INITIAL_DISPLAY;
  private leftNumber = EMPTY_VALUE;
  private rightNumber = EMPTY_VALUE;
  private currentOperation = EMPTY_VALUE;
  private isOperationSelected = false;

  getDisplayValue(): string {
    return this.displayValue;
  }

  getLeftNumber(): string {
    return this.leftNumber;
  }

  getRightNumber(): string {
    return this.rightNumber;
  }

  getCurrentOperation(): string {
    return this.currentOperation;
  }

  getIsOperationSelected(): boolean {
    return this.isOperationSelected;
  }

  updateValue(value: string): void {
    if (value === '.') {
      if (this.displayValue.indexOf(value) > -1) return;
      if (this.displayValue === INITIAL_DISPLAY) {
        this.displayValue = '0.';
        return;
      }
    }

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

  removeSingleDigit(): void {
    this.displayValue = this.displayValue.slice(
      0,
      this.displayValue.length - 1
    );
    if (this.displayValue.length === 0) {
      this.displayValue = INITIAL_DISPLAY;
    }
  }

  setOperation(operation: string): void {
    this.currentOperation = operation;
    if (this.leftNumber === EMPTY_VALUE) {
      this.leftNumber = this.displayValue;
    }
  }

  setDisplayValue(value: string): void {
    this.displayValue = value;
  }

  setLeftNumber(value: string): void {
    this.leftNumber = value;
  }

  setRightNumber(value: string): void {
    this.rightNumber = value;
  }

  setIsOperationSelected(value: boolean): void {
    this.isOperationSelected = value;
  }

  clearAll(): void {
    this.displayValue = INITIAL_DISPLAY;
    this.leftNumber = EMPTY_VALUE;
    this.rightNumber = EMPTY_VALUE;
    this.currentOperation = EMPTY_VALUE;
    this.isOperationSelected = false;
  }

  switchSign(): void {
    if (this.displayValue === INITIAL_DISPLAY) return;
    if (this.displayValue[0] === '-') {
      this.displayValue = this.displayValue.slice(1);
    } else {
      this.displayValue = '-' + this.displayValue;
    }
  }
}
