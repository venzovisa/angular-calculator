import { Routes } from '@angular/router';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { MemoryComponent } from './components/memory/memory.component';

export const routes: Routes = [
  {
    path: 'calculator/:value',
    component: CalculatorComponent,
    title: 'Calculator',
  },
  {
    path: 'memory',
    component: MemoryComponent,
    title: 'Memory',
  },
];
