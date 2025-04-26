import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MemoryService } from '../../services/memory/memory.service';
import { MemoryItem } from '../../models';

@Component({
  selector: 'app-memory',
  imports: [AsyncPipe],
  templateUrl: './memory.component.html',
  styleUrl: './memory.component.scss',
})
export class MemoryComponent {
  private readonly router = inject(Router);
  private readonly memoryService = inject(MemoryService);
  memoryItems: Observable<MemoryItem[]>;

  constructor() {
    this.memoryItems = this.memoryService.getMemory();
  }

  useMemoryItem(value: number) {
    this.router.navigate([`/calculator/${value}`]);
  }

  removeMemoryItem(id: string) {
    this.memoryService.removeMemoryItem(id);
  }
}
