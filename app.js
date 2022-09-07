const buttons = document.querySelectorAll('.buttons-grid > .button');
const display = document.getElementById('display');
const history = document.getElementById('history');
//starts the calculator
function startCalculator(){
    updateDisplay();
    buttons.forEach(button =>
        button.addEventListener('click', () => {
            /* updateDisplay(button);
            buttons.forEach((e) => {e.blur();}); 
            //these from first iteration where all logic existed in updateDisplay
            */
            if(button.classList.contains('number')){
                inputNumber(button.value);
                updateDisplay();
                updateHistory(button.value);
                //updateHistory(displayValue);//button.value
            }
            else if (button.classList.contains('operator')){
                inputOperator(button.value);
                updateDisplay();
                updateHistory(button.value);
            }
            else if (button.classList.contains('equals')){
                inputEquals(button.value);
                updateDisplay();
            }
            else if (button.classList.contains('clear')){
                clearDisplay();
                updateDisplay();
            }
            else if (button.classList.contains('decimal')){
                inputDecimal(button.value);
                updateDisplay();
                updateHistory(button.value);
            }
            else if (button.classList.contains('sign')){
                inputSign(displayValue);
                updateDisplay();
                updateHistory(button.value);
            }
            else if (button.classList.contains('percent')){
                inputPercent(displayValue);
                updateDisplay();
                updateHistory(button.value);
            }
        })
    );
}
//global variables declarations
let displayValue = '0'
let firstNumber = '';
let secondNumber = '';
let firstOperator = '';
let secondOperator= '';
let runningHistory = '';
let result = '';

//calculate/math functions
function add(num1, num2){
    const result = num1+ num2;
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
    }else if(operator === "-"){
        return subtract(num1, num2)
    }else if(operator === "*"){
        return multiply(num1, num2)
    }else if(operator === "/"){
        return divide(num1, num2)
    }
}

//function to update display
function updateDisplay(){
    display.textContent = displayValue;
    if (displayValue.length > 9){
        display.textContent = displayValue.substring(0,9);
    }
}


function updateHistory(input){
   if (firstOperator === ''){
        // if(displayValue.length < 2){
        //     runningHistory += `${input}`
        // }else { 
            runningHistory += `${input}`;
            return
        
    } else  if (input === '+') {
        runningHistory += ' +  '
        history.textContent = runningHistory;
    } else if (input === '-') {
        runningHistory += ' -  ';
        history.textContent = runningHistory;
    } else if (input === '*') {
        runningHistory += ' × ';
        history.textContent = runningHistory;
    } else if (input === '/') {
        runningHistory += ' ÷  ';
        history.textContent = runningHistory;
    } else if (input === 'sign') {
        let i = displayValue.length;
        newHistory = runningHistory.slice(0, -parseInt(i));
        runningHistory = `${newHistory}${displayValue}`
        history.textContent = runningHistory;
    } else if (input === 'percent') {
        let i = displayValue.length;
        newHistory = runningHistory.slice(0, -parseInt(i-1));
        runningHistory = `${newHistory} ${displayValue}`
        history.textContent = runningHistory;
    } else if (input === '.') {
        let i = displayValue.length;
        newHistory = runningHistory.slice(0, -parseInt(i));
        runningHistory = `${newHistory}${displayValue}`
        history.textContent = runningHistory;
    }else {
        runningHistory += `${input}`;
        history.textContent = runningHistory;
    }
}


function inputNumber(num){
    if(firstOperator === ''){
        if (displayValue === '0' || displayValue === 0){
            //1st button click - assigns DisplayValue to first clicked button value
            displayValue = num;
        }else if(displayValue === firstNumber){
            //called after inputEquals() and starts a new operation
            displayValue = num;
        }else {
            //adds more digits if no operator inputs by so far
            displayValue += num;
        }
    }else {
        //2nd number click after operator - firstNumber is already set
        if(displayValue === firstNumber){
            displayValue = num;
        }else {
            //adds more digits if no other operator or equals inputs by user
            displayValue += num;
        }
    }
}

function inputOperator(op){
    if(firstOperator !== '' && secondOperator === ''){
        //second operator after first operation complete
        secondOperator = op;
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), firstOperator);
        displayValue = result; //may need to add some rounding here
        firstNumber = displayValue;
        result = '';

    }else if (firstOperator !== '' && secondOperator !== '') {
        //operators after the second operator input
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), secondOperator);
        secondOperator = op;
        displayValue = result;
        firstNumber = displayValue;
        result = '';
    }else {
        //first operator input by user after 1st number selection
        firstOperator = op;
        firstNumber = displayValue;
    }
}

function inputEquals(num){
    if(firstOperator === ''){
        //makes sure a value is displayed no matter when = is input by user
        displayValue = displayValue;
    }else if(secondOperator !== ''){
        //displays final result
        secondNumber = displayValue;
        history.textContent += ` =`
        result = operate(Number(firstNumber), Number(secondNumber), secondOperator);
        if(result === 'Error: divide by 0'){
            displayValue = 'Error: Cannot divide by 0';
        }else { 
            displayValue = result;
            firstNumber = displayValue;
            secondNumber = '';
            firstOperator = '';
            secondOperator = '';
            result = '';
            runningHistory = '';
            
        }
    }else {
        secondNumber = displayValue;
        history.textContent += `  =`
        result = operate(Number(firstNumber), Number(secondNumber), firstOperator);
        if(result === 'Error: divide by 0'){
            displayValue = 'Error: Cannot divide by 0';
        }else { 
            displayValue = result;            
            firstNumber = displayValue;
            secondNumber = '';
            firstOperator = '';
            secondOperator = '';
            result = '';
            runningHistory = '';
            
        }
    }
}

function inputDecimal(dot) {
    if(displayValue === firstNumber || displayValue === secondNumber){
        displayValue = '0';
        displayValue += dot;
    }else if(!displayValue.includes(dot)){
        displayValue += dot;
    }
}

function inputSign(num) {
    displayValue = (num * -1).toString();
}

function inputPercent(num) {
    displayValue = (num/100).toString();
}

function clearDisplay(){
    displayValue = '0'
    history.textContent = '';
    firstNumber = '';
    secondNumber = '';
    firstOperator = '';
    secondOperator= '';
    runningHistory = '';
    result = '';
}
//helper function for updateDisplay to find the key in an obj given the value of that key
/* function getObjKey(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
} */
//helper function to truncate longer decimal numbers
function truncDecimals(answer) {
    if (answer.toString().indexOf('.') !== -1) {
      if (answer.toString().split('.')[1].length > 5) {
        return answer.toFixed(5);
      }
    }
    return answer;
  }

startCalculator();
  