
import './App.css';
import { useState } from 'react';
import {evaluate} from 'mathjs';

function App() {
  const [calc, setCalc] = useState('');
  const [result, setResult] = useState('');

  const operators = ['/','*','+','-'];

  const updateCalc = (value) =>{

    // prevent operator at the start
if(operators.includes(value) && calc === ""){
      return;
}

// prevent two operators in a row
if(operators.includes(value) && operators.includes(calc.slice(-1))){
      return;
}

// prevent start a number with two zeros in a row
const lastNumber = calc.split(/[+\-*/]/).pop(); 
  if (value === '0' && lastNumber === '0') {
    return;
  }

// prevent multiple decimals in a number
if(value === "." && calc.split(/[+\-*/]/).pop().includes(".")){
  return;
}

    setCalc(prev => prev + value)
  }

  // calculate arrow function with the evaluate method 
  const calculate = () => {
    try{
      const evalResult = evaluate(calc);
      setResult(evalResult.toString());
      // update calc
      setCalc(evalResult.toString())
    } catch(e) {
      setResult("error")
    }
  }


  // clear result
const handleClear = () =>{
  setCalc('');
    setResult('');
}


return (
  <div id="container">
    <div id="calculator">
      <div id="display">
      {result !== '' ? result : calc || "0"}{/* if result is not empty, display "result" else display calc or "0" */}
      </div>

      <div>
        <button id="clear" onClick={handleClear}>AC</button>
        <button id="decimal" onClick={() => updateCalc('.')}>.</button>
        <button id="divide" onClick={() => updateCalc('/')}>/</button>
      </div>

      <div>
        <button id="seven" onClick={() => updateCalc("7")}>7</button>
        <button id="eight" onClick={() => updateCalc("8")}>8</button>
        <button id="nine" onClick={() => updateCalc("9")}>9</button>
        <button id="multiply" onClick={() => updateCalc('*')}>*</button>
      </div>

      <div>
        <button id="four" onClick={() => updateCalc("4")}>4</button>
        <button id="five" onClick={() => updateCalc("5")}>5</button>
        <button id="six" onClick={() => updateCalc("6")}>6</button>
        <button id="add" onClick={() => updateCalc('+')}>+</button>
      </div>

      <div>
        <button id="one" onClick={() => updateCalc("1")}>1</button>
        <button id="two" onClick={() => updateCalc("2")}>2</button>
        <button id="three" onClick={() => updateCalc("3")}>3</button>
        <button id="subtract" onClick={() => updateCalc('-')}>-</button>
      </div>

      <div>
        <button id="zero" onClick={() => updateCalc("0")}>0</button>
        <button id="equals" onClick={calculate}  >=</button>
      </div>
    </div>
  </div>
);
}

export default App;