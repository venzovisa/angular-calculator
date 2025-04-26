import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { MemoryComponent } from './memory.component';
import { MemoryService } from '../../services/memory/memory.service';
import { MemoryItem } from '../../models';

describe('MemoryComponent', () => {
  let component: MemoryComponent;
  let fixture: ComponentFixture<MemoryComponent>;
  let memoryService: jasmine.SpyObj<MemoryService>;
  let router: jasmine.SpyObj<Router>;
  let mockMemoryItems: BehaviorSubject<MemoryItem[]>;

  const mockMemoryItem: MemoryItem = {
    id: '1',
    date: '2024-01-01',
    expression: '2 + 2',
    result: 4,
  };

  beforeEach(async () => {
    mockMemoryItems = new BehaviorSubject<MemoryItem[]>([mockMemoryItem]);

    const memoryServiceSpy = jasmine.createSpyObj('MemoryService', [
      'getMemory',
      'removeMemoryItem',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    memoryServiceSpy.getMemory.and.returnValue(mockMemoryItems.asObservable());

    await TestBed.configureTestingModule({
      imports: [MemoryComponent],
      providers: [
        { provide: MemoryService, useValue: memoryServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    memoryService = TestBed.inject(
      MemoryService
    ) as jasmine.SpyObj<MemoryService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with memory items from service', () => {
    component.memoryItems.subscribe((items) => {
      expect(items).toEqual([mockMemoryItem]);
    });
  });

  it('should navigate to calculator with value when useMemoryItem is called', () => {
    const testValue = 42;
    component.useMemoryItem(testValue);
    expect(router.navigate).toHaveBeenCalledWith([`/calculator/${testValue}`]);
  });

  it('should remove memory item when removeMemoryItem is called', () => {
    const itemId = '1';
    component.removeMemoryItem(itemId);
    expect(memoryService.removeMemoryItem).toHaveBeenCalledWith(itemId);
  });

  it('should update memory items when service emits new values', () => {
    const newMemoryItem: MemoryItem = {
      id: '2',
      date: '2024-01-02',
      expression: '3 + 3',
      result: 6,
    };

    mockMemoryItems.next([mockMemoryItem, newMemoryItem]);

    component.memoryItems.subscribe((items) => {
      expect(items).toEqual([mockMemoryItem, newMemoryItem]);
    });
  });
});
