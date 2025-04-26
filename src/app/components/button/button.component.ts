import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonType, BUTTON_LABELS } from './button.types';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-calculator-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type: ButtonType = ButtonType.NUMBER;
  @Input() value: string = '';
  @Input() testId: string = '';
  @Output() buttonClick = new EventEmitter<void>();

  get label(): string {
    return this.type === ButtonType.NUMBER
      ? this.value
      : BUTTON_LABELS[this.type];
  }

  onClick(): void {
    this.buttonClick.emit();
  }
}
