
import './App.css';
import { useState } from 'react';

function App() {
  const [calc, setCalc] = useState('');
  const [result, setResult] = useState('');

  

  return (
    <div id="container">
      <div id="calculator">
        <div id="display">
          {result ?  <span>(0)</span> : ""} { calc || "0"}
        </div>
          <div>
            <button id="clear">AC</button>
            <button id="decimal">.</button>
            <button id="divide">/</button>
          </div>
          <div>
            <button id="seven">7</button>
            <button id="eight">8</button>
            <button id="nine">9</button>
            <button id="multiply">*</button>
          </div>
          <div>
            <button id="four">4</button>
            <button id="five">5</button>
            <button id="six">6</button>
            <button id="add">+</button>
          </div>
          <div>
            <button id="one">1</button>
            <button id="two">2</button>
            <button id="three">3</button>
            <button id="subtract">-</button>
          </div>
          <div>
            <button id="zero">0</button>
            <button id="equals">=</button>
          </div>
        </div>
      
      
    </div>
  );
}

export default App;
