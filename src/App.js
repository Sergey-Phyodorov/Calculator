import style from "./App.module.css";
import { useState } from "react";

// Функция для создания тела калькулятора
function createCalcBody(numbersButtons, functionsButtons) {
  const calculatorBody = [];

  // Итерация по функциональным кнопкам
  functionsButtons.forEach((func, index) => {
    if (index <= 3) {
      // Если индекс меньше или равен 3, добавляем функциональную кнопку в тело калькулятора
      calculatorBody.push(func);
    } else if (index === 4) {
      // Если индекс равен 4, итерируемся по числовым кнопкам
      numbersButtons.forEach((number, index) => {
        if (index <= 2) {
          // Если индекс числовой кнопки меньше или равен 2, добавляем ее в тело калькулятора
          calculatorBody.push(number);
        }
      });
      // Добавляем функциональную кнопку в тело калькулятора
      calculatorBody.push(func);
    } else if (index === 5) {
      // Аналогично для индекса 5
      numbersButtons.forEach((number, index) => {
        if (index >= 3 && index <= 5) {
          calculatorBody.push(number);
        }
      });
      calculatorBody.push(func);
    } else if (index === 6) {
      // Аналогично для индекса 6
      numbersButtons.forEach((number, index) => {
        if (index >= 6 && index <= 8) {
          calculatorBody.push(number);
        }
      });
      calculatorBody.push(func);
    } else if (index === 7) {
      // Аналогично для индекса 7
      numbersButtons.forEach((number, index) => {
        if (index >= 9 && index <= 11) {
          calculatorBody.push(number);
        }
      });
      calculatorBody.push(func);
    } else if (index === 8) {
      // Аналогично для индекса 8
      numbersButtons.forEach((number, index) => {
        if (index === 10) {
          calculatorBody.push(number);
        }
      });
      calculatorBody.push(func);
    }
  });

  return calculatorBody;
}

function App() {
  const calcNumbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  const calcFunctions = ["C", "+/-", "%", "/", "*", "-", "+", ".", "="];

  const [startDisplay, setDisplay] = useState("");
  const [mathOperation, setMathOperation] = useState(false);
  const [mathResultDisplay, setMathResultDisplay] = useState(false);

  // Функция для вычисления математического выражения
  function mathEval(inValue) {
    setMathOperation(!mathOperation);
    console.log(mathOperation);
    return eval(inValue);
  }

  // Функция для вывода значения на дисплей калькулятора
  function outputCalculatorDisplay(inValue) {
    setDisplay((prev) => prev + inValue);
  }

  // Функция для обработки нажатия кнопок калькулятора
  function calcMath(event) {
    const enterButton = event.target.value;
    if (enterButton === "C") {
      if (mathResultDisplay) {
        setMathResultDisplay((prev) => !prev);
      }
      setDisplay(() => "");
    } else if (enterButton === "+") {
      outputCalculatorDisplay(enterButton);
      if (mathOperation) {
        setMathOperation((prev) => !prev);
      }
      if (mathResultDisplay) {
        setMathResultDisplay((prev) => !prev);
      }
    } else if (enterButton === "-") {
      outputCalculatorDisplay(enterButton);
      if (mathOperation) {
        setMathOperation((prev) => !prev);
      }
    } else if (enterButton === "=") {
      const result = mathEval(startDisplay);
      setDisplay(() => "");
      if (!mathResultDisplay) {
        setMathResultDisplay((prev) => !prev);
      }
      outputCalculatorDisplay(result);
    } else if (enterButton === "*") {
      // Обработка нажатия кнопки умножения
    } else if (enterButton === "/") {
      // Обработка нажатия кнопки деления
    } else if (enterButton === "%") {
      // Обработка нажатия кнопки процента
    } else if (enterButton === "+/-") {
      // Обработка нажатия кнопки изменения знака
    } else if (enterButton === ".") {
      // Обработка нажатия кнопки десятичной точки
    } else {
      if (mathOperation) {
        setDisplay(() => "");
        setMathOperation((prev) => !prev);
        if (mathResultDisplay) {
          setMathResultDisplay((prev) => !prev);
        }
        outputCalculatorDisplay(enterButton);
      } else {
        if (mathResultDisplay) {
          setMathResultDisplay((prev) => !prev);
        }
        outputCalculatorDisplay(enterButton);
      }
    }
  }

  // Создание числовых кнопок
  const calcNumbersButtons = calcNumbers.map((number, index) => {
    return (
      <button
        onClick={calcMath}
        key={number}
        value={number}
        className={index === calcNumbers.length - 1 ? style.btnLarge : ""}
      >
        {number}
      </button>
    );
  });

  // Создание функциональных кнопок
  const calcFunctionsButtons = calcFunctions.map((func) => {
    return (
      <button
        onClick={calcMath}
        key={func}
        value={func}
        className={style.btnOpaque}
      >
        {func}
      </button>
    );
  });

  return (
    <div className="App">
      <div className={style.calculator}>
        <div className="calculator__wrap">
          <div
            id="calculatorDisplay"
            className={
              mathResultDisplay === true
                ? style.resultCalculatorDisplay
                : style.calculatorDisplay
            }
          >
            {startDisplay === "" ? 0 : startDisplay}
          </div>
          <div className={style.calculatorFunctions}>
            {createCalcBody(calcNumbersButtons, calcFunctionsButtons)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
