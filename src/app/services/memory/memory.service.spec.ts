import { TestBed } from '@angular/core/testing';
import { MemoryService } from './memory.service';
import { MemoryItem } from '../../models';
import { take } from 'rxjs/operators';

describe('MemoryService', () => {
  let service: MemoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemoryService],
    });
    service = TestBed.inject(MemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMemory', () => {
    it('should return an observable of empty array initially', (done) => {
      service
        .getMemory()
        .pipe(take(1))
        .subscribe((memory) => {
          expect(memory).toEqual([]);
          done();
        });
    });
  });

  describe('setMemory', () => {
    it('should add a new memory item', (done) => {
      const testItem: MemoryItem = {
        id: '1',
        date: '2024-04-17',
        expression: '2 + 2',
        result: 4,
      };

      service.setMemory(testItem);

      service
        .getMemory()
        .pipe(take(1))
        .subscribe((memory) => {
          expect(memory).toContain(testItem);
          done();
        });
    });

    it('should maintain only the last 100 items', (done) => {
      // Create 101 items
      for (let i = 0; i < 101; i++) {
        service.setMemory({
          id: i.toString(),
          date: '2024-04-17',
          expression: `${i} + ${i}`,
          result: i * 2,
        });
      }

      service
        .getMemory()
        .pipe(take(1))
        .subscribe((memory) => {
          expect(memory.length).toBe(100);
          // The first item (id: '0') should be removed
          expect(memory.find((item) => item.id === '0')).toBeUndefined();
          // The last item (id: '100') should be present
          expect(memory.find((item) => item.id === '100')).toBeTruthy();
          done();
        });
    });
  });

  describe('removeMemoryItem', () => {
    it('should remove the specified memory item', (done) => {
      const testItem: MemoryItem = {
        id: '1',
        date: '2024-04-17',
        expression: '2 + 2',
        result: 4,
      };

      service.setMemory(testItem);
      service.removeMemoryItem('1');

      service
        .getMemory()
        .pipe(take(1))
        .subscribe((memory) => {
          expect(memory).not.toContain(testItem);
          done();
        });
    });

    it('should not affect other memory items when removing one', (done) => {
      const item1: MemoryItem = {
        id: '1',
        date: '2024-04-17',
        expression: '2 + 2',
        result: 4,
      };
      const item2: MemoryItem = {
        id: '2',
        date: '2024-04-17',
        expression: '3 + 3',
        result: 6,
      };

      service.setMemory(item1);
      service.setMemory(item2);
      service.removeMemoryItem('1');

      service
        .getMemory()
        .pipe(take(1))
        .subscribe((memory) => {
          expect(memory).not.toContain(item1);
          expect(memory).toContain(item2);
          done();
        });
    });
  });
});
