import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { MemoryService } from '../../services/memory/memory.service';
import { CalculationService } from '../../services/calculation/calculation.service';
import { DisplayService } from '../../services/display/display.service';
import { operations } from '../../models';
import { ButtonComponent } from '../button/button.component';
import { ButtonType } from '../button/button.types';

@Component({
  selector: 'app-calculator',
  imports: [ButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly memoryService = inject(MemoryService);
  private readonly calculationService = inject(CalculationService);
  private readonly displayService = inject(DisplayService);

  operations = operations;
  ButtonType = ButtonType;

  constructor() {
    const initialValue = this.route.snapshot.paramMap.get('value');
    if (initialValue) {
      this.displayService.setDisplayValue(initialValue);
    }
  }

  get displayValue(): string {
    return this.displayService.getDisplayValue();
  }

  get currentOperation(): string {
    return this.displayService.getCurrentOperation();
  }

  get leftNumber(): string {
    return this.displayService.getLeftNumber();
  }

  get rightNumber(): string {
    return this.displayService.getRightNumber();
  }

  updateValue(value: string): void {
    this.displayService.updateValue(value);
  }

  removeSingleDigit(): void {
    this.displayService.removeSingleDigit();
  }

  updateOperation(operation: string): void {
    this.displayService.setOperation(operation);

    if (
      operation === operations.SQRT &&
      this.displayService.getLeftNumber() !== ''
    ) {
      const result = this.calculationService.calculateSquareRoot(
        Number(this.displayService.getLeftNumber())
      );
      this.displayService.setDisplayValue(String(result));
      this.memoryService.setMemory({
        id: uuidv4(),
        date: new Date().toDateString(),
        expression: `${operation}(${this.displayService.getLeftNumber()})`,
        result,
      });
    }
  }

  calculateExpression(): void {
    if (this.displayService.getCurrentOperation() === '') return;

    const leftNumber = Number(this.displayService.getLeftNumber());
    this.displayService.setRightNumber(this.displayService.getDisplayValue());
    const rightNumber = Number(this.displayService.getRightNumber());

    try {
      const result = this.calculationService.calculate(
        leftNumber,
        rightNumber,
        this.displayService.getCurrentOperation()
      );

      this.displayService.setDisplayValue(String(result));
      this.displayService.setLeftNumber(String(result));
      this.displayService.setIsOperationSelected(false);

      this.memoryService.setMemory({
        id: uuidv4(),
        date: new Date().toDateString(),
        expression: `${leftNumber} ${this.displayService.getCurrentOperation()} ${rightNumber}`,
        result,
      });
    } catch (error) {
      this.clearAll();
    }
  }

  clearAll(): void {
    this.displayService.clearAll();
  }

  switchSign(): void {
    this.displayService.switchSign();
  }
}
