import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  public history: [{ calculation?: string; answer?: string }] = [{}];
  public currentCalculation: string = '';
  public disableHistoryButton: boolean = true;

  public lastActionIsOperator: boolean = false;
  public dottAdded: boolean = false;
  public shouldReset: boolean = false;

  private readonly SERVER_URL: string = 'http://localhost:5146/calculate';

  constructor(public http: HttpClient) {}

  public addToNumbers(value: string): void {
    this.shouldReset
      ? (this.currentCalculation = value)
      : (this.currentCalculation += value);
    this.shouldReset = false;
    this.lastActionIsOperator = false;
  }

  public handleDot(): void {
    if (
      this.dottAdded ||
      this.currentCalculation.length === 0 ||
      this.lastActionIsOperator ||
      this.shouldReset
    ) {
      return;
    }
    this.lastActionIsOperator = true;
    this.currentCalculation += '.';
    this.dottAdded = true;
  }

  public addToOperators(char: string): void {
    if (this.illegalFirstChar(char) || this.onlyOneElementAndIsMinus(char)) {
      return;
    }

    this.shouldReset = false;
    if (this.lastActionIsOperator) {
      this.currentCalculation = this.currentCalculation.slice(0, -1);
    }
    this.dottAdded = false;
    this.currentCalculation += char;
    this.lastActionIsOperator = true;
  }

  public backspace(): void {
    if (this.currentCalculation.length === 0) {
      return;
    }
    this.currentCalculation = this.shouldReset
      ? ''
      : this.currentCalculation.slice(0, -1);
    this.shouldReset = false;
  }

  public clear(): void {
    this.currentCalculation = '';
    this.dottAdded = false;
    this.lastActionIsOperator = false;
    this.shouldReset = false;
  }

  public clearHistory(): void {
    this.history = [{}];
    this.disableHistoryButton = true;
  }

  public async calculate(): Promise<void> {
    this.http
      .post<string>(this.SERVER_URL, {
        Input: this.currentCalculation,
      })
      .pipe(take(1))
      .subscribe((value) => {
        this.history.unshift({
          calculation: this.currentCalculation,
          answer: value,
        });
        this.currentCalculation = value;
        this.shouldReset = true;
        this.disableHistoryButton = false;
      });
  }

  public disableCalculateButton(): boolean {
    return (
      this.currentCalculation.length === 0 ||
      this.lastActionIsOperator ||
      this.shouldReset ||
      this.dividingByZero()
    );
  }

  private dividingByZero(): boolean {
    return this.currentCalculation.includes('/0');
  }

  private illegalFirstChar(char: string) {
    return this.currentCalculation.length === 0 && char !== '-';
  }

  private onlyOneElementAndIsMinus(char: string): boolean {
    return (
      this.currentCalculation.length === 1 &&
      this.currentCalculation[0] === '-' &&
      char !== '-'
    );
  }
}
