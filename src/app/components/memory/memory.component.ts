import { Component, inject } from '@angular/core';
import { MemoryService } from '../../services/memory.service';
import { MemoryItem } from '../../models';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-memory',
  imports: [AsyncPipe],
  templateUrl: './memory.component.html',
  styleUrl: './memory.component.scss',
})
export class MemoryComponent {
  memoryService = inject(MemoryService);
  memoryItems: Observable<MemoryItem[]>;

  constructor() {
    this.memoryItems = this.memoryService.getMemory();
  }
}
