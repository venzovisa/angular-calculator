export enum ButtonType {
  PERCENT = 'PERCENT',
  POWER = 'POWER',
  CLEAR = 'CLEAR',
  REMOVE = 'REMOVE',
  SQRT = 'SQRT',
  FACTORIAL = 'FACTORIAL',
  DIVISION = 'DIVISION',
  MULTIPLICATION = 'MULTIPLICATION',
  SUBTRACTION = 'SUBTRACTION',
  ADDITION = 'ADDITION',
  SIGN = 'SIGN',
  EQUALS = 'EQUALS',
  DOT = 'DOT',
  NUMBER = 'NUMBER',
}

export const BUTTON_LABELS: Record<ButtonType, string> = {
  [ButtonType.PERCENT]: '%',
  [ButtonType.POWER]: 'xⁿ',
  [ButtonType.CLEAR]: 'CE',
  [ButtonType.REMOVE]: '⌫',
  [ButtonType.SQRT]: '√',
  [ButtonType.FACTORIAL]: 'n!',
  [ButtonType.DIVISION]: '÷',
  [ButtonType.MULTIPLICATION]: '×',
  [ButtonType.SUBTRACTION]: '−',
  [ButtonType.ADDITION]: '+',
  [ButtonType.SIGN]: '±',
  [ButtonType.EQUALS]: '=',
  [ButtonType.DOT]: '.',
  [ButtonType.NUMBER]: '',
};

export const BUTTON_ICONS: Partial<Record<ButtonType, string>> = {
  [ButtonType.REMOVE]: '⌫',
  [ButtonType.SQRT]: '√',
  [ButtonType.DIVISION]: '÷',
  [ButtonType.MULTIPLICATION]: '×',
  [ButtonType.ADDITION]: '+',
  [ButtonType.SUBTRACTION]: '−',
  [ButtonType.EQUALS]: '=',
};
