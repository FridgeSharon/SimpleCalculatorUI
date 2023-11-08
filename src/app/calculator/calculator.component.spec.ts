import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CalculatorComponent } from './calculator.component';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatButtonModule,
        MatGridListModule,
        MatInputModule,
        MatListModule,
        BrowserAnimationsModule,
      ],
      declarations: [CalculatorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.lastActionIsOperator = false;
    component.dottAdded = false;
    component.shouldReset = false;
    component.disableHistoryButton = true;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addToNumbers', () => {
    it('should add a number to the current calculation', () => {
      component.addToNumbers('1');
      expect(component.currentCalculation).toBe('1');
    });

    it('should append a number to the current calculation', () => {
      component.currentCalculation = '1';
      component.addToNumbers('2');
      expect(component.currentCalculation).toBe('12');
    });

    it('should reset the current calculation if shouldReset is true', () => {
      component.shouldReset = true;
      component.addToNumbers('1');
      expect(component.currentCalculation).toBe('1');
    });

    it('should set shouldReset to false', () => {
      component.shouldReset = true;
      component.addToNumbers('1');
      expect(component.shouldReset).toBe(false);
    });

    it('should set lastActionIsOperator to false', () => {
      component.lastActionIsOperator = true;
      component.addToNumbers('1');
      expect(component.lastActionIsOperator).toBe(false);
    });
  });

  describe('handleDot', () => {
    it('should add a dot to the current calculation', () => {
      component.currentCalculation = '1';
      component.handleDot();
      expect(component.currentCalculation).toBe('1.');
    });

    it('should not add a dot if one has already been added', () => {
      component.dottAdded = true;
      component.currentCalculation = '1.';
      component.handleDot();
      expect(component.currentCalculation).toBe('1.');
    });

    it('should not add a dot if the current calculation is empty', () => {
      component.currentCalculation = '';
      component.handleDot();
      expect(component.currentCalculation).toBe('');
    });

    it('should not add a dot if the last action was an operator', () => {
      component.lastActionIsOperator = true;
      component.currentCalculation = '1+';
      component.handleDot();
      expect(component.currentCalculation).toBe('1+');
    });

    it('should not add a dot if shouldReset is true', () => {
      component.shouldReset = true;
      component.handleDot();
      expect(component.currentCalculation).toBe('');
    });

    it('should set lastActionIsOperator to true', () => {
      component.currentCalculation = '1';
      component.handleDot();
      expect(component.lastActionIsOperator).toBe(true);
    });

    it('should set dottAdded to true', () => {
      component.currentCalculation = '1';
      component.handleDot();
      expect(component.dottAdded).toBe(true);
    });
  });

  describe('addToOperators', () => {
    it('should not add an operator if it is the first character and it is not a minus sign', () => {
      component.addToOperators('+');
      expect(component.currentCalculation).toBe('');
    });

    it('should not add an operator if there is only one element and it is a minus sign', () => {
      component.currentCalculation = '-';
      component.addToOperators('+');
      expect(component.currentCalculation).toBe('-');
    });

    it('should not add an operator if the last action was an operator', () => {
      component.lastActionIsOperator = true;
      component.currentCalculation = '1+';
      component.addToOperators('+');
      expect(component.currentCalculation).toBe('1+');
    });

    it('should remove the last character if the last action was an operator', () => {
      component.lastActionIsOperator = true;
      component.currentCalculation = '1+';
      component.addToOperators('-');
      expect(component.currentCalculation).toBe('1-');
    });

    it('should set shouldReset to false', () => {
      component.shouldReset = true;
      component.currentCalculation = '1';
      component.addToOperators('+');
      expect(component.shouldReset).toBe(false);
    });

    it('should set dottAdded to false', () => {
      component.dottAdded = true;
      component.currentCalculation = '1.1';
      component.addToOperators('+');
      expect(component.dottAdded).toBe(false);
    });

    it('should append the operator to the current calculation', () => {
      component.currentCalculation = '1';
      component.addToOperators('+');
      expect(component.currentCalculation).toBe('1+');
    });

    it('should set lastActionIsOperator to true', () => {
      component.currentCalculation = '1';
      component.addToOperators('+');
      expect(component.lastActionIsOperator).toBe(true);
    });
  });

  describe('backspace', () => {
    it('should do nothing if the current calculation is empty', () => {
      component.backspace();
      expect(component.currentCalculation).toBe('');
    });

    it('should remove the last character from the current calculation', () => {
      component.currentCalculation = '123';
      component.backspace();
      expect(component.currentCalculation).toBe('12');
    });

    it('should set shouldReset to false', () => {
      component.currentCalculation = '123';
      component.shouldReset = true;
      component.backspace();
      expect(component.shouldReset).toBe(false);
    });
  });

  describe('clear', () => {
    it('should clear the current calculation', () => {
      component.currentCalculation = '123';
      component.clear();
      expect(component.currentCalculation).toBe('');
    });

    it('should set dottAdded to false', () => {
      component.dottAdded = true;
      component.clear();
      expect(component.dottAdded).toBe(false);
    });

    it('should set lastActionIsOperator to false', () => {
      component.lastActionIsOperator = true;
      component.clear();
      expect(component.lastActionIsOperator).toBe(false);
    });

    it('should set shouldReset to false', () => {
      component.shouldReset = true;
      component.clear();
      expect(component.shouldReset).toBe(false);
    });
  });

  describe('clearHistory', () => {
    it('should clear the history', () => {
      component.history = [{ calculation: '1+1', answer: '2' }];
      component.clearHistory();
      expect(component.history).toEqual([{}]);
    });

    it('should disable the history button', () => {
      component.disableHistoryButton = false;
      component.clearHistory();
      expect(component.disableHistoryButton).toBe(true);
    });
  });

  describe('calculate', () => {
    beforeEach(() => {
      spyOn(component.http, 'post').and.returnValue({
        pipe: () => ({
          subscribe: (callback: (value: string) => void) => callback('2.5'),
        }),
      } as any);
    });

    it('should add the current calculation and its result to the history', async () => {
      component.currentCalculation = '1+1';
      await component.calculate();
      expect(component.history).toEqual([
        { calculation: '1+1', answer: '2.5' },
        {},
      ]);
    });

    it('should set the current calculation to the result', async () => {
      component.currentCalculation = '1+1';
      await component.calculate();
      expect(component.currentCalculation).toBe('2.5');
    });

    it('should set shouldReset to true', async () => {
      component.currentCalculation = '1+1';
      await component.calculate();
      expect(component.shouldReset).toBe(true);
    });

    it('should enable the history button', async () => {
      component.currentCalculation = '1+1';
      await component.calculate();
      expect(component.disableHistoryButton).toBe(false);
    });
  });

  describe('disableCalculateButton', () => {
    it('should return true if the current calculation is empty', () => {
      component.currentCalculation = '';
      expect(component.disableCalculateButton()).toBe(true);
    });

    it('should return true if the last action was an operator', () => {
      component.currentCalculation = '1+';
      component.lastActionIsOperator = true;
      expect(component.disableCalculateButton()).toBe(true);
    });

    it('should return true if shouldReset is true', () => {
      component.shouldReset = true;
      expect(component.disableCalculateButton()).toBe(true);
    });

    it('should return true if the current calculation is dividing by zero', () => {
      component.currentCalculation = '1/0';
      expect(component.disableCalculateButton()).toBe(true);
    });

    it('should return false otherwise', () => {
      component.currentCalculation = '1+1';
      expect(component.disableCalculateButton()).toBe(false);
    });
  });
});
