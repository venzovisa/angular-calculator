import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { ButtonType, BUTTON_LABELS } from './button.types';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Input properties', () => {
    it('should have default values', () => {
      expect(component.type).toBe(ButtonType.NUMBER);
      expect(component.value).toBe('');
      expect(component.testId).toBe('');
    });

    it('should set custom values', () => {
      component.type = ButtonType.ADDITION;
      component.value = '5';
      component.testId = 'test-button';
      fixture.detectChanges();

      expect(component.type).toBe(ButtonType.ADDITION);
      expect(component.value).toBe('5');
      expect(component.testId).toBe('test-button');
    });
  });

  describe('label getter', () => {
    it('should return value when type is NUMBER', () => {
      component.type = ButtonType.NUMBER;
      component.value = '7';
      expect(component.label).toBe('7');
    });

    it('should return button label from BUTTON_LABELS when type is not NUMBER', () => {
      component.type = ButtonType.ADDITION;
      expect(component.label).toBe(BUTTON_LABELS[ButtonType.ADDITION]);
    });
  });

  describe('onClick', () => {
    it('should emit buttonClick event when clicked', () => {
      const spy = jasmine.createSpy('buttonClick');
      component.buttonClick.subscribe(spy);
      component.onClick();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Template rendering', () => {
    it('should render button with correct test id', () => {
      component.testId = 'test-button';
      fixture.detectChanges();

      const buttonElement = fixture.nativeElement.querySelector(
        '[data-testid="test-button"]'
      );
      expect(buttonElement).toBeTruthy();
    });

    it('should render button with correct label text', () => {
      component.type = ButtonType.ADDITION;
      fixture.detectChanges();

      const buttonElement = fixture.nativeElement.querySelector('.button');
      expect(buttonElement.textContent.trim()).toBe(
        BUTTON_LABELS[ButtonType.ADDITION]
      );
    });

    it('should render number value when type is NUMBER', () => {
      component.type = ButtonType.NUMBER;
      component.value = '9';
      fixture.detectChanges();

      const buttonElement = fixture.nativeElement.querySelector('.button');
      expect(buttonElement.textContent.trim()).toBe('9');
    });

    it('should emit click event when button is clicked', () => {
      const spy = jasmine.createSpy('buttonClick');
      component.buttonClick.subscribe(spy);
      const buttonElement = fixture.nativeElement.querySelector('.button');

      buttonElement.click();
      expect(spy).toHaveBeenCalled();
    });
  });
});
