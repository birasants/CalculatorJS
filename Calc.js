class calculator{
  constructor(previousOperandTextElement, currentOperandTextElement){
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.allClear();
  }

  delete(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  allClear(){
    this.currentOperand = '' ;
    this.previousOperand = '' ;
    this.operand = undefined;
  }
  
  compute(){
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if(isNaN(prev) || isNaN(current)) return;
    switch (this.operation){
      case '+' :
        computation = prev + current;
        break;
      case '-' :
        computation = prev - current;
        break;
      case '÷':
        computation = prev / current;
        break;
      case'x':
        computation = prev * current;
        break;
      default:
        return
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  chooseOperation(operation){
    if(this.currentOperand === '') return;
    if(this.previousOperand !== ''){
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  appendNumber(number){
    if(number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  getDisplayNumber(number){
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay;
    if (isNaN(integerDigits)){
      integerDisplay = '';
    }else{
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0})
    }
    if(decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    }else{
      return integerDisplay;
    }
  }

  updateDisplay(){
    this.currentOperandTextElement.innerText = 
    this.getDisplayNumber(this.currentOperand)
    if(this.operation != null){
       this.previousOperandTextElement.innerText = 
       `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
  }
    }
   
}


const operandButton = document.querySelectorAll('[data-operand]');
const numberButton = document.querySelectorAll('[data-number]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-clear]');
const allClearButton = document.querySelector('[data-allClear]');
const previousOperandTextElement = document.querySelector('[data-displayPrevious]');
const currentOperandTextElement = document.querySelector('[data-currentOperand]');

const Calculator = new calculator(previousOperandTextElement, currentOperandTextElement);

numberButton.forEach(button =>{
  button.addEventListener('click', ()=>{
    Calculator.appendNumber(button.innerText);
    Calculator.updateDisplay();
  })
})

operandButton.forEach(button =>{
  button.addEventListener('click', ()=>{
    Calculator.chooseOperation(button.innerText);
    Calculator.updateDisplay();
  })
})

equalsButton.addEventListener('click', button =>{
  Calculator.compute();
  Calculator.updateDisplay();
})

allClearButton.addEventListener('click', button =>{
  Calculator.allClear();
  Calculator.updateDisplay();
})

deleteButton.addEventListener('click', button =>{
  Calculator.delete();
  Calculator.updateDisplay();
})