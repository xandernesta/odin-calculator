const buttons = document.querySelectorAll('.buttons-grid > .button');
const display = document.getElementById('display');
const history = document.getElementById('history');
//starts the calculator
buttons.forEach(button =>
    button.addEventListener('click', () => {
        updateDisplay(button);
        buttons.forEach((e) => {e.blur();});
    })
);
//global variables declarations
let firstNumber = '';
let secondNumber = '';
let nextUserInput = '';
let runningResult = '';
let operation = '';

//calculate/math functions
function add(num1, num2){
    const result = parseInt(num1) + parseInt(num2);
    return truncDecimals(result);
}
function subtract(num1, num2){
    const  result = num1 - num2;
    return truncDecimals(result)
}
function multiply(num1, num2){
    const  result = num1 * num2;
    return truncDecimals(result)
}
function divide(num1, num2){
    if (num2 === 0) {
        return 'Error: divide by 0';
    }else{
    const  result = num1/num2;
    return truncDecimals(result)
    }
}

//operation given two numbers and operator
function operate(num1, num2, operator){
    if(operator === "+"){
        return add(num1, num2)
    } else if(operator === "-"){
        return subtract(num1, num2)
    } else if(operator === "*"){
        return multiply(num1, num2)
    } else if(operator === "/"){
        return divide(num1, num2)
    }
}

//function to update display
function updateDisplay(input){
    const operators = {
        '+': 'plus',
        '-': 'minus',
        '*': 'multiply',
        '/': 'divide',
    }
    if(firstNumber === '' && input.className == "button number"){
        history.textContent = '';
        display.textContent = input.textContent;
        firstNumber = input.textContent;
    }else if(secondNumber === '' && input.className == "button number"){
        history.textContent += ` ${input.textContent}`;
        secondNumber = input.textContent;
        display.textContent = '';
        runningResult = operate(firstNumber, secondNumber, operation);
        nextUserInput = '';
        console.log(`operation = ${operation}  + firstNumber = ${firstNumber}  + secondNumber = ${secondNumber}  + result = ${operate(firstNumber, secondNumber, operation)} & nextUserInput = ${nextUserInput}`);
        //cannot return two variables at once https://stackoverflow.com/questions/2917175/return-multiple-values-in-javascript
    }else if(firstNumber !== '' && secondNumber !== '' && input.className === "button number"){
        firstNumber = runningResult; //runningResult is assigned after secondNumber is input
        nextUserInput = input.textContent; //assigning nextUserInput a value to add a check in the operation conditional so a nextUserInput needs to be selected before a second operator can be selected
        secondNumber = nextUserInput; 
        display.textContent = nextUserInput.textContent;
        history.textContent += ` ${input.textContent}`;
        console.log(`operation = ${operation}  + first/nextUserInput = ${firstNumber}  + secondNumber = ${secondNumber}  + result = ${operate(firstNumber, secondNumber, operation)}  & nextUserInput = ${nextUserInput}`);
        runningResult = operate(firstNumber, secondNumber, operation);
    }else if(input.className === "button operator"){
        if (nextUserInput === '+' || nextUserInput === '-' || nextUserInput === '/' || nextUserInput === '*' ){
            return
        }else if(Object.values(operators).includes(`${input.id}`)){
                    op = getObjKey(operators, input.id);
                    history.textContent += `${display.textContent} ${op}`;
                    display.textContent = "";
                    operation = op;
                    nextUserInput = op;
                   }
    }else if(input.className === "button equals"){
            if(nextUserInput === ''){
                history.textContent += ` ${display.textContent} =`;
                display.textContent = operate(firstNumber, secondNumber, operation);
                firstNumber = '';
                secondNumber = '';
                }
                else{
                    history.textContent += ` ${display.textContent} =`;
                    display.textContent = operate(firstNumber, secondNumber, operation);
                    firstNumber = '';
                    secondNumber = '';
                    nextUserInput = '';
                }
    }else if(input.className === "button clear"){
        history.textContent = '';
        display.textContent = '';
        firstNumber = '';
        secondNumber = '';
        nextUserInput = '';
    }
        
        
     
     


    console.log(`operation = ${operation}  + first/nextUserInput = ${firstNumber}  + secondNumber = ${secondNumber}  + result = ${operate(firstNumber, secondNumber, operation)}  & nextUserInput = ${nextUserInput}`);

}
//helper function for updateDisplay to find the key in an obj given the value of that key
function getObjKey(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
  }
//helper function to truncate longer decimal numbers
function truncDecimals(answer) {
    if (answer.toString().indexOf('.') !== -1) {
      if (answer.toString().split('.')[1].length > 5) {
        return answer.toFixed(5);
      }
    }
    return answer;
  }
  