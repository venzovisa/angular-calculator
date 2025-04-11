export type MemoryItem = {
  id: string;
  date: string;
  expression: string;
  result: number;
};

export enum operations {
  ADDITION = '+',
  MULTIPLICATION = '*',
  SUBSTRACTION = '-',
  DIVISION = '/',
  PERCENT = '%',
  POWER = '^',
  SQRT = 'sqrt',
  FACTORIAL = 'n!',
}
