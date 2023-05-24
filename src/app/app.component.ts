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
    //console.log("Number pressed: " + integer)
  }
  operatorPressed(operator: string){
    this.expression.push(operator)
    //console.log("Operator pressed: " + operator)
  }
  //number = new BehaviorSubject<number>();
  //operator = new BehaviorSubject<string>();
}
