const buttons = document.querySelectorAll('.buttons-grid > .button');
const display = document.getElementById('display');
const history = document.getElementById('history');
//nine.addEventListener('onclick', updateDisplay())
buttons.forEach(button =>
    button.addEventListener('click', () => {
        updateDisplay(button);
        buttons.forEach((e) => {e.blur();});
    })
);
//let newInput = '';

//calculate/math functions
function add(num1, num2){
    return  result = num1 + num2;
}
function subtract(num1, num2){
    return  result = num2 - num1;
}
function multiply(num1, num2){
    return  result = num1 * num2;
}
function divide(num1, num2){
    return  result = num1 / num2;
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
    if(input.className === "button operator"){
        if(Object.values(operators).includes(`${input.id}`)){
            op = getObjKey(operators, input.id);
            display.textContent += ` ${op}`;
        }
    }else{
        display.textContent = input.textContent;}

}
//helper function for updateDisplay to find the key in an obj given the value of that key
function getObjKey(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
  }
  