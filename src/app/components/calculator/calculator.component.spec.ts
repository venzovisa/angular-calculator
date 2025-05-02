import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { ActivatedRoute } from '@angular/router';

class MockRouter {
  snapshot = {
    paramMap: {
      get: () => '100',
    },
  };
}

describe('CalculatorComponent', () => {
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useClass: MockRouter,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    fixture.detectChanges();
  });

  it('should render calculator with correct saved value', () => {
    const inputField = fixture.nativeElement.querySelector(
      "[data-testid='display']"
    );
    expect(inputField.value).toEqual('100');
  });

  it('should render correct value when divide 100 by 2', () => {
    const buttonDivide = fixture.nativeElement.querySelector(
      "[data-testid='button-divide']"
    );
    buttonDivide.dispatchEvent(new Event('click'));

    const buttonTwo = fixture.nativeElement.querySelector(
      "[data-testid='button-two']"
    );
    buttonTwo.dispatchEvent(new Event('click'));

    const buttonCalculate = fixture.nativeElement.querySelector(
      "[data-testid='button-calculate']"
    );
    buttonCalculate.dispatchEvent(new Event('click'));

    const inputField = fixture.nativeElement.querySelector(
      "[data-testid='display']"
    );
    fixture.detectChanges();

    expect(inputField.value).toEqual('50');
  });

  it('should render correct value when add 3 to 0.14', () => {
    const buttonClear = fixture.nativeElement.querySelector(
      "[data-testid='button-clear']"
    );
    buttonClear.dispatchEvent(new Event('click'));

    const buttonThree = fixture.nativeElement.querySelector(
      "[data-testid='button-three']"
    );
    buttonThree.dispatchEvent(new Event('click'));

    const buttonAddition = fixture.nativeElement.querySelector(
      "[data-testid='button-addition']"
    );
    buttonAddition.dispatchEvent(new Event('click'));

    const buttonDot = fixture.nativeElement.querySelector(
      "[data-testid='button-dot']"
    );
    buttonDot.dispatchEvent(new Event('click'));

    const buttonOne = fixture.nativeElement.querySelector(
      "[data-testid='button-one']"
    );
    buttonOne.dispatchEvent(new Event('click'));

    const buttonFour = fixture.nativeElement.querySelector(
      "[data-testid='button-four']"
    );
    buttonFour.dispatchEvent(new Event('click'));

    const buttonCalculate = fixture.nativeElement.querySelector(
      "[data-testid='button-calculate']"
    );
    buttonCalculate.dispatchEvent(new Event('click'));

    const inputField = fixture.nativeElement.querySelector(
      "[data-testid='display']"
    );
    fixture.detectChanges();

    expect(inputField.value).toEqual('3.14');
  });

  it('should render correct value when substract 5 and 7', () => {
    const buttonClear = fixture.nativeElement.querySelector(
      "[data-testid='button-clear']"
    );
    buttonClear.dispatchEvent(new Event('click'));

    const buttonFive = fixture.nativeElement.querySelector(
      "[data-testid='button-five']"
    );
    buttonFive.dispatchEvent(new Event('click'));

    const buttonSubstract = fixture.nativeElement.querySelector(
      "[data-testid='button-substract']"
    );
    buttonSubstract.dispatchEvent(new Event('click'));

    const buttonSeven = fixture.nativeElement.querySelector(
      "[data-testid='button-seven']"
    );
    buttonSeven.dispatchEvent(new Event('click'));

    const buttonCalculate = fixture.nativeElement.querySelector(
      "[data-testid='button-calculate']"
    );
    buttonCalculate.dispatchEvent(new Event('click'));

    const inputField = fixture.nativeElement.querySelector(
      "[data-testid='display']"
    );
    fixture.detectChanges();

    expect(inputField.value).toEqual('-2');
  });

  it('should render correct value when multiplicate -8 and -9', () => {
    const buttonClear = fixture.nativeElement.querySelector(
      "[data-testid='button-clear']"
    );
    buttonClear.dispatchEvent(new Event('click'));

    const buttonFive = fixture.nativeElement.querySelector(
      "[data-testid='button-eight']"
    );
    buttonFive.dispatchEvent(new Event('click'));

    const buttonSign = fixture.nativeElement.querySelector(
      "[data-testid='button-sign']"
    );
    buttonSign.dispatchEvent(new Event('click'));

    const buttonMultiplicate = fixture.nativeElement.querySelector(
      "[data-testid='button-multiplicate']"
    );
    buttonMultiplicate.dispatchEvent(new Event('click'));

    const buttonNine = fixture.nativeElement.querySelector(
      "[data-testid='button-nine']"
    );
    buttonNine.dispatchEvent(new Event('click'));

    const buttonSign2 = fixture.nativeElement.querySelector(
      "[data-testid='button-sign']"
    );
    buttonSign2.dispatchEvent(new Event('click'));

    const buttonCalculate = fixture.nativeElement.querySelector(
      "[data-testid='button-calculate']"
    );
    buttonCalculate.dispatchEvent(new Event('click'));

    const inputField = fixture.nativeElement.querySelector(
      "[data-testid='display']"
    );
    fixture.detectChanges();

    expect(inputField.value).toEqual('72');
  });

  it('should render correct value when calculate square root of 9', () => {
    const buttonClear = fixture.nativeElement.querySelector(
      "[data-testid='button-clear']"
    );
    buttonClear.dispatchEvent(new Event('click'));

    const buttonNine = fixture.nativeElement.querySelector(
      "[data-testid='button-nine']"
    );
    buttonNine.dispatchEvent(new Event('click'));

    const buttonSqrt = fixture.nativeElement.querySelector(
      "[data-testid='button-sqrt']"
    );
    buttonSqrt.dispatchEvent(new Event('click'));

    const inputField = fixture.nativeElement.querySelector(
      "[data-testid='display']"
    );
    fixture.detectChanges();

    expect(inputField.value).toEqual('3');
  });

  it('should render correct value when remove single digit', () => {
    const buttonClear = fixture.nativeElement.querySelector(
      "[data-testid='button-clear']"
    );
    buttonClear.dispatchEvent(new Event('click'));

    const buttonSix = fixture.nativeElement.querySelector(
      "[data-testid='button-six']"
    );
    buttonSix.dispatchEvent(new Event('click'));
    buttonSix.dispatchEvent(new Event('click'));

    const buttonRemove = fixture.nativeElement.querySelector(
      "[data-testid='button-remove']"
    );
    buttonRemove.dispatchEvent(new Event('click'));

    const inputField = fixture.nativeElement.querySelector(
      "[data-testid='display']"
    );
    fixture.detectChanges();

    expect(inputField.value).toEqual('6');
  });
});
