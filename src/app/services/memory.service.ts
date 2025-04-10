import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MemoryItem } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MemoryService {
  private data = new BehaviorSubject<MemoryItem[]>([]);

  getMemory() {
    return this.data.asObservable();
  }

  setMemory(item: MemoryItem) {
    this.data.value.push(item);
    this.data.next(this.data.value);
  }
}
