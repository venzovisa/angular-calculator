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

    if (this.data.value.length > 100) {
      this.data.value.shift();
    }

    this.data.next(this.data.value);
  }

  removeMemoryItem(id: string) {
    this.data.next(this.data.value.filter((item) => item.id !== id));
  }
}
