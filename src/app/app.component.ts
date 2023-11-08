import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SimpleCalculatorUI';
  public isCalculatorActivated: Subject<boolean>;
  public calculatorBy: string = `Guy Sharon, heyguysha@gmail.com`;

  constructor() {
    this.isCalculatorActivated = new Subject<boolean>();
  }

  activateCalculator() {
    this.isCalculatorActivated.next(true);
  }
}
