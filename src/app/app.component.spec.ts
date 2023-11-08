import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a title 'SimpleCalculatorUI'`, () => {
    expect(component.title).toEqual('SimpleCalculatorUI');
  });

  it('should have a button to activate the calculator', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.textContent).toContain('Go to calculator');
  });

  it('should emit an event when the calculator is activated', () => {
    const spy = jasmine.createSpy('isCalculatorActivated');
    component.isCalculatorActivated.subscribe(spy);
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith(true);
  });
});
