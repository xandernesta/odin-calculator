const buttons = document.querySelectorAll('.buttons-grid > .button');
const display = document.getElementById('display');
const history = document.getElementById('history');
//starts the calculator
function startCalculator(){
    buttons.forEach(button =>
        button.addEventListener('click', () => {
            /* updateDisplay(button);
            buttons.forEach((e) => {e.blur();}); 
            //these from first iteration where all logic existed in updateDisplay
            */
        if(button.classList.contains('number')){
            inputNumber(button.value);
            updateDisplay();
        }
        else if (button.classList.contains('operator')){
            inputOperator(button.value);
            updateDisplay();
            updateHistory();
        }
        else if (button.classList.contains('equals')){
            inputEquals(button.value);
            updateDisplay();
        }
        else if (button.classList.contains('clear')){}
        else if (button.classList.contains('decimal')){}

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

// let nextUserInput = '';
// let operation = '';
// let isTyping = false;
// let isFirstNumber = '';
// let isSecondNumber = '';

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
    } else if(operator === "-"){
        return subtract(num1, num2)
    } else if(operator === "*"){
        return multiply(num1, num2)
    } else if(operator === "/"){
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
updateDisplay();

function updateHistory(){
    if(secondOperator === ''){
        if(secondNumber === ''){
            runningHistory = `${firstNumber} ${firstOperator}`
            history.textContent = runningHistory;
        } else{ 
            runningHistory += ` ${secondNumber} =`
            history.textContent = runningHistory;
        }
    } else if(secondOperator !== ''){
        runningHistory += ` ${secondNumber} ${secondOperator}`
        history.textContent = runningHistory;
    } 
}

function inputNumber(num){
    if(firstOperator === ''){
        if (displayValue === '0' || displayValue === 0){
            //1st button click - assigns DisplayValue to first clicked button value
            displayValue = num;
        } else if(displayValue === firstNumber){
            //called after inputEquals() and starts a new operation
            displayValue = num;
        } else {
            //adds more digits if no operator inputs by so far
            displayValue += num;
        }
    }
    else {
        //2nd number click after operator - firstNumber is already set
        if(displayValue === firstNumber){
            displayValue = num;
        } else {
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

    } else if (firstOperator !== '' && secondOperator !== '') {
        //operators after the second operator input
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), secondOperator);
        secondOperator = op;
        displayValue = result;
        firstNumber = displayValue;
        result = '';
    } else {
        //first operator input by user after 1st number selection
        firstOperator = op;
        firstNumber = displayValue;
    }
}

function inputEquals(num){
    if(firstOperator === ''){
        //makes sure a value is displayed no matter when = is input by user
        displayValue = displayValue;
    } else if(secondOperator !== ''){
        //displays final result
        secondNumber = displayValue;
        history.textContent += ` ${secondNumber} =`
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
    } else {
        secondNumber = displayValue;
        history.textContent += ` ${secondNumber} =`
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
/* function updateDisplay(input){
    const operators = {
        '+': 'plus',
        '-': 'minus',
        '*': 'multiply',
        '/': 'divide',
    }
    if(firstNumber === '' && input.className == "button number"){ //currently can only enter single digit numbers! need to update to allow multi-digit numbers
        isFirstNumber = true;
        history.textContent = '';
        runningFirstNumber = saveNumber(input.textContent)
        display.textContent = runningFirstNumber;
        isTyping = true;
        
    }else if(secondNumber === '' && input.className == "button number" ){
        isFirstNumber = false;
        isSecondNumber = true;
        history.textContent += ` ${input.textContent}`;
        runningSecondNumber = saveNumber(input.textContent);
        display.textContent = '';
        runningResult = operate(firstNumber, runningSecondNumber, operation);
        nextUserInput = '';
        isTyping = true;
        //console.log(`operation = ${operation}  + firstNumber = ${firstNumber}  + secondNumber = ${secondNumber}  + result = ${operate(firstNumber, secondNumber, operation)} & nextUserInput = ${nextUserInput}`);
        //cannot return two variables at once https://stackoverflow.com/questions/2917175/return-multiple-values-in-javascript
    }else if(firstNumber !== '' && secondNumber !== '' && input.className === "button number" ){
        isTyping = true;
        firstNumber = runningResult; //runningResult is assigned after secondNumber is input
        nextUserInput = input.textContent; //assigning nextUserInput a value to add a check in the operation conditional so a nextUserInput needs to be selected before a second operator can be selected
        secondNumber = nextUserInput; 
        display.textContent = nextUserInput.textContent;
        history.textContent += ` ${input.textContent}`;
        //console.log(`operation = ${operation}  + first/nextUserInput = ${firstNumber}  + secondNumber = ${secondNumber}  + result = ${operate(firstNumber, secondNumber, operation)}  & nextUserInput = ${nextUserInput}`);
        runningResult = operate(firstNumber, secondNumber, operation);
    }else if(input.className === "button operator"){
        if (nextUserInput === '+' || nextUserInput === '-' || nextUserInput === '/' || nextUserInput === '*' ){
            isTyping = false;
            isFirstNumber = false;
            return
        }else if(Object.values(operators).includes(`${input.id}`)){
                    op = getObjKey(operators, input.id);
                    history.textContent += `${display.textContent} ${op}`;
                    display.textContent = "";
                    operation = op;
                    nextUserInput = op;
                    isTyping = false;
                    isFirstNumber = false;
                   }
    }else if(input.className === "button equals"){
            if(nextUserInput === ''){
                history.textContent += ` ${display.textContent} =`;
                display.textContent = operate(firstNumber, secondNumber, operation);
                firstNumber = '';
                secondNumber = '';
                isTyping = false;
                isFirstNumber = false;
                isSecondNumber = false;
                }
                else{
                    history.textContent += ` ${display.textContent} =`;
                    display.textContent = operate(firstNumber, secondNumber, operation);
                    firstNumber = '';
                    secondNumber = '';
                    nextUserInput = '';
                    isTyping = false;
                    isFirstNumber = false;
                }
    }else if(input.className === "button clear"){
        history.textContent = '';
        display.textContent = '';
        firstNumber = '';
        secondNumber = '';
        nextUserInput = '';
        isTyping = false;
        isFirstNumber = false;
    }
    //console.log(`operation = ${operation}  + first/nextUserInput = ${firstNumber}  + secondNumber = ${secondNumber}  + result = ${operate(firstNumber, secondNumber, operation)}  & nextUserInput = ${nextUserInput}`);

} */
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

/* function saveNumber(num){
    if (isTyping === false){
        if(isFirstNumber === true){
        let runningFirstNumber = num
        return runningFirstNumber;
        }
        else if(isFirstNumber === false){
            firstNumber = runningFirstNumber;
            return firstNumber;
        }
        else if(isSecondNumber === true){
            let runningSecondNumber = num
            return runningSecondNumber;
        }
            
        
    }
    else if(isTyping === true){
        if(isFirstNumber === true){
        runningFirstNumber += num;  
        return runningFirstNumber;
        }
        else if(isSecondNumber === true){
            secondNumber = runningFirstNumber;
            return secondNumber;
        }
    }
    
} */

startCalculator();
  