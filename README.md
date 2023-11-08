# SimpleCalculatorUI by Guy Sharon

This project goes in tandem with the `SOLIDCalculator` microservice.
Can also work with the lite version of the microservice, `SimpleCalculator`.

## Run the code

Run `ng serve` in the terminal.  
Navigate to `http://localhost:4200/`.  
The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test`.

## Notes
Input is only possible through the buttons.  
History is saved in the App, not in the microservice, this was to simplify the project and thinking of actual usage for a calculator.  
The calculate(`=`) button is disabled until a valid calculation is possible.  
This is a relatively complex solution to an otherwise simple problem.  

## Possible upgrades

- Instead of using a string, this could have been done with a stack.
- The history could have been saves in the Microservice, and not in the App.
- Input could be possible through the keyboard, and direct intput to the relevant field.