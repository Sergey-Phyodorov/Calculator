import style from "./App.module.css";
import { useState } from "react";

// Функция для создания тела калькулятора
function createCalcBody(numbersButtons, functionsButtons) {
  const calculatorBody = [];

  // Итерация по функциональным кнопкам
  functionsButtons.forEach((func, index) => {
    if (index <= 3) {
      calculatorBody.push(func);
    } else if (index === 4) {
      numbersButtons.forEach((number, index) => {
        if (index <= 2) {
          calculatorBody.push(number);
        }
      });
      calculatorBody.push(func);
    } else if (index === 5) {
      numbersButtons.forEach((number, index) => {
        if (index >= 3 && index <= 5) {
          calculatorBody.push(number);
        }
      });
      calculatorBody.push(func);
    } else if (index === 6) {
      numbersButtons.forEach((number, index) => {
        if (index >= 6 && index <= 8) {
          calculatorBody.push(number);
        }
      });
      calculatorBody.push(func);
    } else if (index === 7) {
      numbersButtons.forEach((number, index) => {
        if (index >= 9 && index <= 11) {
          calculatorBody.push(number);
        }
      });
      calculatorBody.push(func);
    } else if (index === 8) {
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

// Функция валидации вычислительных процессов
function calculatorValidation(inValue) {
  const strMathematicalExpression = inValue.toString().trim();

  if (
    typeof strMathematicalExpression === "string" &&
    strMathematicalExpression.length
  ) {
    let arrMathematicalExpression = Array.from(strMathematicalExpression);

    // Удаляем все пробелы
    arrMathematicalExpression = arrMathematicalExpression.filter(
      (item) => item !== " ",
    );

    const resultArrMathematicalExpression = arrMathematicalExpression.reduce(
      (accumulator, currentValue) => {
        if (!isNaN(currentValue) || currentValue === ".") {
          if (
            typeof accumulator[accumulator.length - 1] === "string" &&
            (!isNaN(accumulator[accumulator.length - 1]) ||
              accumulator[accumulator.length - 1].endsWith("."))
          ) {
            accumulator[accumulator.length - 1] += currentValue;
          } else {
            accumulator.push(currentValue.toString());
          }
        } else {
          if (
            typeof accumulator[accumulator.length - 1] === "string" &&
            !isNaN(accumulator[accumulator.length - 1])
          ) {
            accumulator[accumulator.length - 1] = parseFloat(
              accumulator[accumulator.length - 1],
            );
          }
          accumulator.push(currentValue);
        }
        return accumulator;
      },
      [],
    );

    // Если последний элемент является строкой и представляет число, преобразуем его в число
    if (
      typeof resultArrMathematicalExpression[
        resultArrMathematicalExpression.length - 1
      ] === "string" &&
      !isNaN(
        resultArrMathematicalExpression[
          resultArrMathematicalExpression.length - 1
        ],
      )
    ) {
      resultArrMathematicalExpression[
        resultArrMathematicalExpression.length - 1
      ] = parseFloat(
        resultArrMathematicalExpression[
          resultArrMathematicalExpression.length - 1
        ],
      );
    }

    console.log(
      "resultArrMathematicalExpression",
      resultArrMathematicalExpression,
    );
    return resultArrMathematicalExpression;
  } else {
    return console.log(
      "Получен пустой String или не String",
      strMathematicalExpression,
    );
  }
}

// calculatorValidation("-123 + 3 3 - 1 . 5 +4.5- 5. 3--");

// Функция логической работы вычислительных процессов калькулятора
function calculatorLogic(inValue) {
  if (Array.isArray(inValue) && inValue.length) {
    // Проверка, состоит ли массив только из числовых значений
    if (inValue.every((item) => typeof item === "number")) {
      return console.log("Результат:", inValue[0]);
    }

    // Обработка последовательных минусов перед числом
    let i = 0;
    while (inValue[i] === "-" || inValue[i] === "+") {
      if (inValue[i] === "-") {
        inValue[i + 1] = -inValue[i + 1];
      }
      i++;
    }

    // Удаляем обработанные минусы и плюсы
    inValue = inValue.slice(i);

    let result = inValue[0];
    let currentOperator = null;

    for (i = 1; i < inValue.length; i++) {
      const currentValue = inValue[i];

      if (typeof currentValue === "number" && currentOperator) {
        switch (currentOperator) {
          case "+":
            result += currentValue;
            break;
          case "-":
            result -= currentValue;
            break;
          // Добавьте другие операторы, если это необходимо (например, умножение и деление)
          default:
            console.log("Неизвестный оператор:", currentOperator);
            break;
        }
        currentOperator = null; // Сбрасываем текущий оператор после использования
      } else {
        currentOperator = currentValue; // Устанавливаем текущий оператор
      }
    }

    // return console.log("Результат:", result);
    return result;
  } else {
    if (Array.isArray(inValue)) {
      return console.log("Получен пустой Array", inValue.length);
    } else {
      return console.log(
        "Полученные данные не Array. Тип данных:",
        "inValue",
        typeof inValue,
      );
    }
  }
}

function App() {
  const calcNumbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  const calcFunctions = ["C", "+/-", "%", "/", "*", "-", "+", ".", "="];

  const [startDisplay, setDisplay] = useState("");
  const [mathOperation, setMathOperation] = useState(false);
  const [mathResultDisplay, setMathResultDisplay] = useState(false);

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
      const result = calculatorLogic(calculatorValidation(startDisplay));
      setDisplay(() => "");
      setMathOperation(!mathOperation);
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
