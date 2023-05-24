import { Component } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'AngularCalculator';
  expression: any[] = []; // Array to store the expression
  result!: number; // Variable to store the result

  operator!: string;
  number!: number;

  numberPressed(integer: number){
    this.expression.push(integer)
    console.log("Expression: " + this.expression)
    //console.log("Number pressed: " + integer)
  }
  operatorPressed(operator: string){
    switch(operator){ 
      case '=': {
        console.log("Calculating result")
        calculateResult(this.expression)
        break
      }
      case 'clear': {
        console.log("Clearing expression")
        this.expression = []
        break
      }
      default: {
        this.expression.push(operator)
    }
  }
  }
}

function calculateResult(expression: any[]) {
  // TODO: Calculate the result of the expression

  var highest_operator = { // This will keep track of the highest operator
    name: '',
    operator: 0,
    index: -1
  } 
  // Sets the operator values
  const bracket: number = 1;
  const exponent: number = 2;
  const divide: number = 3;
  const multiply: number = 4;
  const add: number = 5;
  const subtract: number = 6;

  // Record highest order operater first
  for (let i = 0; i < expression.length; i++){
    switch (expression[i]){
      case '/': {
        if (highest_operator.operator == 0){ // Set divide as highest operator if the highest_operator is null
          highest_operator.name = 'divide';
          highest_operator.operator = divide;
          highest_operator.index = i;
        }
        else if (highest_operator.operator > divide){ // Compare current highest operator value to the divide operator value, lowest number becomes the highest operator
          highest_operator.name = 'divide';
          highest_operator.operator = divide;
          highest_operator.index = i;
        }
          console.log("divide found, index: ", [i])
          console.log("highest operator: ", highest_operator)
          break;
      }
      case '*': {
        if (highest_operator.operator == 0){ // Set multiply as highest operator if the highest_operator is null
          highest_operator.name = 'multiply';
          highest_operator.operator = multiply;
          highest_operator.index = i;
        }
        else if (highest_operator.operator > multiply){ // Compare current highest operator value to the multiply operator value, lowest number becomes the highest operator
          highest_operator.name = 'multiply';
          highest_operator.operator = multiply;
          highest_operator.index = i;
        }
          console.log("multiply found, index: ", [i])
          console.log("highest operator: ", highest_operator)
          break;
      }
      case '+': {
        if (highest_operator.operator == 0){ // Set divide as highest operator if the highest_operator is null
          highest_operator.name = 'add';
          highest_operator.operator = add;
          highest_operator.index = i;
        }
        else if (highest_operator.operator > add){ // Compare current highest operator value to the divide operator value, lowest number becomes the highest operator
          highest_operator.name = 'add';
          highest_operator.operator = add;
          highest_operator.index = i;
        }
          console.log("add found, index: ", [i])
          console.log("highest operator: ", highest_operator)
          break;
      }
      case '-': {
        if (highest_operator.operator == 0){ // Set divide as highest operator if the highest_operator is null
          highest_operator.name = 'subtract';
          highest_operator.operator = subtract;
          highest_operator.index = i;
        }
        else if (highest_operator.operator > subtract){ // Compare current highest operator value to the divide operator value, lowest number becomes the highest operator
          highest_operator.name = 'subtract';
          highest_operator.operator = subtract;
          highest_operator.index = i;
        }
          console.log("subtract found, index: ", [i])
          console.log("operator name: ", highest_operator)
          break;
      }
      default: {
        continue
      }
    }
    }
  //capture the adjacent numbers
  
  //calculate adjacent numbers with highest operator them and replacing the result 

  }
  // TODO: Display the result on the calculator screen