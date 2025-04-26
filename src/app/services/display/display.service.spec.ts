import { TestBed } from '@angular/core/testing';
import { DisplayService } from './display.service';

describe('DisplayService', () => {
  let service: DisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Initial state', () => {
    it('should initialize with default values', () => {
      expect(service.getDisplayValue()).toBe('0');
      expect(service.getLeftNumber()).toBe('');
      expect(service.getRightNumber()).toBe('');
      expect(service.getCurrentOperation()).toBe('');
      expect(service.getIsOperationSelected()).toBeFalse();
    });
  });

  describe('updateValue', () => {
    it('should update display value from initial state', () => {
      service.updateValue('5');
      expect(service.getDisplayValue()).toBe('5');
    });

    it('should append digits to existing value', () => {
      service.updateValue('5');
      service.updateValue('6');
      expect(service.getDisplayValue()).toBe('56');
    });

    it('should handle decimal point correctly', () => {
      service.updateValue('5');
      service.updateValue('.');
      service.updateValue('6');
      expect(service.getDisplayValue()).toBe('5.6');
    });

    it('should not add multiple decimal points', () => {
      service.updateValue('5');
      service.updateValue('.');
      service.updateValue('.');
      service.updateValue('6');
      expect(service.getDisplayValue()).toBe('5.6');
    });

    it('should handle decimal point on initial state', () => {
      service.updateValue('.');
      expect(service.getDisplayValue()).toBe('0.');
    });

    it('should reset display when operation is selected', () => {
      service.updateValue('5');
      service.setOperation('+');
      service.updateValue('3');
      expect(service.getDisplayValue()).toBe('3');
      expect(service.getIsOperationSelected()).toBeTrue();
    });
  });

  describe('removeSingleDigit', () => {
    it('should remove last digit', () => {
      service.updateValue('123');
      service.removeSingleDigit();
      expect(service.getDisplayValue()).toBe('12');
    });

    it('should reset to 0 when all digits are removed', () => {
      service.updateValue('1');
      service.removeSingleDigit();
      expect(service.getDisplayValue()).toBe('0');
    });
  });

  describe('setOperation', () => {
    it('should set operation and store left number', () => {
      service.updateValue('5');
      service.setOperation('+');
      expect(service.getCurrentOperation()).toBe('+');
      expect(service.getLeftNumber()).toBe('5');
    });
  });

  describe('clearAll', () => {
    it('should reset all values to initial state', () => {
      service.updateValue('5');
      service.setOperation('+');
      service.updateValue('3');
      service.clearAll();

      expect(service.getDisplayValue()).toBe('0');
      expect(service.getLeftNumber()).toBe('');
      expect(service.getRightNumber()).toBe('');
      expect(service.getCurrentOperation()).toBe('');
      expect(service.getIsOperationSelected()).toBeFalse();
    });
  });

  describe('switchSign', () => {
    it('should add negative sign to positive number', () => {
      service.updateValue('5');
      service.switchSign();
      expect(service.getDisplayValue()).toBe('-5');
    });

    it('should remove negative sign from negative number', () => {
      service.updateValue('5');
      service.switchSign();
      service.switchSign();
      expect(service.getDisplayValue()).toBe('5');
    });

    it('should not modify zero', () => {
      service.switchSign();
      expect(service.getDisplayValue()).toBe('0');
    });
  });

  describe('setters and getters', () => {
    it('should set and get display value', () => {
      service.setDisplayValue('123');
      expect(service.getDisplayValue()).toBe('123');
    });

    it('should set and get left number', () => {
      service.setLeftNumber('456');
      expect(service.getLeftNumber()).toBe('456');
    });

    it('should set and get right number', () => {
      service.setRightNumber('789');
      expect(service.getRightNumber()).toBe('789');
    });

    it('should set and get operation selected state', () => {
      service.setIsOperationSelected(true);
      expect(service.getIsOperationSelected()).toBeTrue();
    });
  });
});
