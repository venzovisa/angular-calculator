import { TestBed } from '@angular/core/testing';
import { CalculationService } from './calculation.service';
import { operations } from '../../models';

describe('CalculationService', () => {
  let service: CalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('calculate', () => {
    it('should perform addition correctly', () => {
      const result = service.calculate(5, 3, operations.ADDITION);
      expect(result).toBe(8);
    });

    it('should perform subtraction correctly', () => {
      const result = service.calculate(5, 3, operations.SUBSTRACTION);
      expect(result).toBe(2);
    });

    it('should perform multiplication correctly', () => {
      const result = service.calculate(5, 3, operations.MULTIPLICATION);
      expect(result).toBe(15);
    });

    it('should perform division correctly', () => {
      const result = service.calculate(6, 2, operations.DIVISION);
      expect(result).toBe(3);
    });

    it('should handle division by zero', () => {
      expect(() => service.calculate(5, 0, operations.DIVISION)).toThrow();
    });

    it('should perform power operation correctly', () => {
      const result = service.calculate(2, 3, operations.POWER);
      expect(result).toBe(8);
    });

    it('should perform percentage calculation correctly', () => {
      const result = service.calculate(200, 10, operations.PERCENT);
      expect(result).toBe(20);
    });

    it('should calculate factorial correctly', () => {
      const result = service.calculate(5, 0, operations.FACTORIAL);
      expect(result).toBe(120);
    });

    it('should handle factorial of 0', () => {
      const result = service.calculate(0, 0, operations.FACTORIAL);
      expect(result).toBe(0);
    });

    it('should throw error for invalid operation', () => {
      expect(() => service.calculate(5, 3, 'invalid')).toThrowError(
        'Invalid operation'
      );
    });
  });

  describe('calculateSquareRoot', () => {
    it('should calculate square root correctly', () => {
      const result = service.calculateSquareRoot(16);
      expect(result).toBe(4);
    });

    it('should handle square root of 0', () => {
      const result = service.calculateSquareRoot(0);
      expect(result).toBe(0);
    });

    it('should handle square root of negative numbers', () => {
      const result = service.calculateSquareRoot(-16);
      expect(result).toBeNaN();
    });
  });
});
