import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

import React, {useState} from 'react';

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const App = () => {

  //States that store values
  let [calc, setCalc] = useState({
    sign: '',
    num: 0,
    res: 0,
  })


  //String formatting
  const toLocaleString = (num) => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
  const removeSpaces = (num) => num.toString().replace(/\s/g, "");


  //What happens when a number is clicked
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if(removeSpaces(calc.num).length < 16){
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === '0' 
            ? '0'
            : calc.num % 1 === 0
            ? Number(calc.num + value)
            : calc.num + value, 
            res : !calc.sign ? 0 : calc.res,

      })
    }
  }

  //What happens when a decimal point is clicked
  const commaClickHandler = (e) => {
    e.preventDefault();

    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num : !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    })
  }

  //what happes when a sign is clicked
  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign : value,
      res : !calc.res && calc.num ? calc.num : calc.res,
      num: 0
    })
  }

  //what happens when an equals sign is precssed
  const equalsClickHandler = () => {
    if(calc.sign && calc.num){
      const math = (a, b, sign) => 
        sign === '+'
          ? a + b
          : sign === '-'
          ? a - b
          : sign === 'X'
          ? a * b 
          : a / b;
      


      setCalc({
        ...calc,
        res:
          calc.num === '0' && calc.sign === '/'
          ? "Can't divide by Zero"
          : math(Number(calc.res), Number(calc.num), calc.sign),
        sign: '',
        num : 0,
      })
    }
  }

  //when the -+ button is hit
  const invertClickHandler = () =>{
    setCalc({
      ...calc,
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1: 0,
      sign: '',
    })
  }

  //When the percentage button is hit
  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(calc.num) : 0;
    let res = calc.res ? parseFloat(calc.res) : 0;


    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (num /= Math.pow(100, 1)),
      sign: '',
    })
  }

  //rests the values
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      num : 0,
      res: 0,
      sign: '',
    })
  }



  return (
    <Wrapper>
      <Screen value= {calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {
          btnValues.flat().map((id, num) => {
            return (
              <Button
                key = {num}
                className={id === '=' ? 'equals' : ''}
                value = {id}
                onClick = {
                  id === "C"
                    ? resetClickHandler
                    : id === '+-'
                    ? invertClickHandler
                    : id === "%"
                    ? percentClickHandler
                    : id === "="
                    ? equalsClickHandler
                    : id === '/' || id === 'X' || id === '+' || id === '-'
                    ? signClickHandler
                    : id === '.'
                    ? commaClickHandler
                    : numClickHandler
                }
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};

export default App;