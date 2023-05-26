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
  operator!: string; // Variable to store the operator
  number!: number; // Variable to store the number
  isResultShown: boolean = false;
  finalResult!: number;

  numberPressed(integer: number){
    this.expression.push(integer)
    //console.log("Expression: " + this.expression)
    //console.log("Number pressed: " + integer)
  }
  operatorPressed(operator: string){
    switch(operator){ 
      case '=': {
        console.log("Calculating result")
        this.expression.push(" = ")
        this.finalResult = calculateResult(this.expression)
        this.isResultShown = true
        break
      }
      case 'clear': {
        console.log("Clearing expression")
        this.expression = []
        this.result = 0
        this.isResultShown = false;
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
  let simplified = false; // This will be used to check if the expression has been simplified
  let result: number = 0; // This will store the result of the expression
  let finalResult: number = 0; // This will store the final result of the expression

  while (!simplified){
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

    // Sets the left and right operand variables
    var left_operand: any[] = [];
    var right_operand: any[] = [];

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
            //console.log("divide found, index: ", [i])
            //console.log("highest operator: ", highest_operator)
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
            //console.log("multiply found, index: ", [i])
            //console.log("highest operator: ", highest_operator)
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
            //console.log("add found, index: ", [i])
            //console.log("highest operator: ", highest_operator)
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
            //console.log("subtract found, index: ", [i])
            //console.log("operator name: ", highest_operator)
            break;
        }
        default: {
          continue
        }
      }
      }

    //capture the number to the left of the operator
    for (let i = highest_operator.index - 1; i >= 0; i--){ 

      // If a number or decimal is found, display it and continue iterating backwards
      if (!isNaN(expression[i]) || expression[i] == '.'){ 
        left_operand.unshift(expression[i])
      }
      
      // If an operator is found, stop iterating
      else if (['/', '*', '+', '-'].includes(expression[i])){
        console.log("Left operand: ", left_operand.join(''))
        break
      }
    }

    //capture the number to the right of the operator
    for (let i = highest_operator.index + 1; i < expression.length; i++){

      if (!isNaN(expression[i]) || expression[i] == '.'){
        right_operand.push(expression[i]) 
      }

      else if (['/', '*', '+', '-'].includes(expression[i])){
        // If an operator is found, stop iterating
        //console.log("Right operand: ", right_operand.join(''))
        break
      }
    }

  console.log("Left operand after loop: ", left_operand.join(''));
  console.log("Right operand after loop: ", right_operand.join(''));

  //calculate adjacent numbers with highest operator them and replacing the result 
  switch (highest_operator.name){
    case 'divide': {
      result = Number(left_operand.join('')) / Number(right_operand.join(''))
      console.log("Result: ", result)
      break
    }
    case 'multiply': {
      result = Number(left_operand.join('')) * Number(right_operand.join(''))
      console.log("Result: ", result)
      break
    }
    case 'add': {
      result = Number(left_operand.join('')) + Number(right_operand.join(''))
      console.log("Result: ", result)
      break
    }
    case 'subtract': {
      result = Number(left_operand.join('')) - Number(right_operand.join(''))
      console.log("Result: ", result)
      break
    }
    default: {
      result = 0
      console.log("Result: ", result)
      break
  }
  }
  // Simplify the expression
  expression.splice(highest_operator.index - left_operand.length, left_operand.length + right_operand.length + 1, result)
  console.log("Expression after splice: ", expression.join(''))

  if (!expression.some(char => ['/', '*', '+', '-'].includes(char))) { 
    // If there are no more operators in the expression, the expression is simplified
    simplified = true;
    console.log("Expression simplified!")
    break;
  }
  }
  finalResult = result
  return finalResult
}
  // TODO: Display the result on the calculator screen