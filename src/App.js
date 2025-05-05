import { useState } from "react";
import { evaluate } from "mathjs";

function App() {
  const [calc, setCalc] = useState("");    
  const [result, setResult] = useState(""); 



  // update the current expression
  const updateCalc = (value) => {
    const lastChar = calc.slice(-1);
    const isOperator = (val) => ["+", "-", "*", "/"].includes(val);
    const lastNumber = calc.split(/[+\-*/]/).pop();

    //  Prevent multiple leading zeros
    if (value === "0" && lastNumber === "0") return;

    //  Prevent multiple decimals 
    if (value === "." && lastNumber.includes(".")) return;

    //  Prevent an operator at the beginning, except "-"
    if (isOperator(value) && calc === "" && value !== "-") return;

    //  Handle consecutive operators
    if (isOperator(value)) {
      let newCalc = calc;

      // Allow "-" after another operator 
      if (value === "-" && isOperator(lastChar) && lastChar !== "-") {
        setCalc(prev => prev + value);
        return;
      }

      // Remove all trailing operators before appending the new one
      while (isOperator(newCalc.slice(-1))) {
        newCalc = newCalc.slice(0, -1);
      }

      setCalc(newCalc + value);
      return;
    }

    // Default: append the value to the expression
    setCalc(prev => prev + value);
  };

  
  const calculate = () => {
    try {
      // Replace any repeated operators with the last one
      let expression = calc.replace(/([+\-*/])\1+/g, "$1");
      const result = evaluate(expression);
      setResult(result.toString());
      setCalc(result.toString());
    } catch (error) {
      setResult("Error");
    }
  };

  // reset 
  const handleClear = () => {
    setCalc("");
    setResult("");
  };

  return (
    <div id="container">
      <div id="calculator">
        <div id="display">
          {result !== "" ? result : calc || "0"}
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
          <button id="equals" onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;