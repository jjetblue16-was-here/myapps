let currentNumber="0";

let numberStorage;

let whatOperatorClicked;

let decimalClick=false;

let lastNumber;

function decimal()  {
    if(decimalClick==false) {
        currentNumber=currentNumber+".";
        display(currentNumber);
    }
    decimalClick=true;
}

function display(theNumber)  {
    document.getElementById("calNumber").textContent=theNumber;
}

function percent()  {
    currentNumber=decimalOperation(currentNumber, "100", "divide");
    display(currentNumber);
}

function negate()   {
    currentNumber=decimalOperation(currentNumber, "-1", "multi");
    display(currentNumber);
}

function operatorClicked(operator)  {
    if(numberStorage==undefined)    {
        numberStorage=currentNumber;
        currentNumber=0;
        decimalClick=false;
    }
    else    {
        numberStorage=equal();
    }
    whatOperatorClicked=operator;
}

function equal() {
    let result;
    decimalClick=false;
    if (lastNumber!=undefined) {
        currentNumber=lastNumber;
        lastNumber=undefined;
    }
    if (whatOperatorClicked=="add") {
        result=decimalOperation(numberStorage, currentNumber, "add")
    }
    else if (whatOperatorClicked=="minus") {
        result=decimalOperation(numberStorage, currentNumber, "minus");
    }
    else if (whatOperatorClicked=="multi") {
        result=decimalOperation(numberStorage, currentNumber, "multi");
    }
    else if (whatOperatorClicked=="divide") {
        result=decimalOperation(numberStorage, currentNumber, "divide");
    }
    numberStorage=result;
    lastNumber=currentNumber;
    display(result);
    currentNumber = "0";
    return result;
}

function numberButton(number)   {
    lastNumber=undefined;    
    currentNumber=currentNumber=="0" ? number : currentNumber+number;
    display(currentNumber);
}

function clearButton()  {
    currentNumber="0";
    decimalClick=false;
    numberStorage=undefined;
    display("0");
    lastNumber=undefined;
}

function decimalOperation(number1, number2, operator)   {
    let decimalPointIndex=number1.indexOf(".");
    let decimalPointIndex2=number2.indexOf(".");
    let decimalPointLength=number1.length;
    let decimalPointLength2=number2.length;
    let numbersAfterPoint=decimalPointIndex!=-1 ? decimalPointLength-1-decimalPointIndex : 0;
    let numbersAfterPoint2=decimalPointIndex2!=-1 ? decimalPointLength2-1-decimalPointIndex2 : 0;
    number1=number1.replace(".", "");
    number2=number2.replace(".", "");
    let firstNumber=parseInt(number1);
    let secondNumber=parseInt(number2);
    let maxFractionalPart=Math.max(numbersAfterPoint, numbersAfterPoint2);
    let stringResult;
    let result;
    if(maxFractionalPart!=0)    {
        firstNumber=firstNumber*(10**(maxFractionalPart-numbersAfterPoint));
        secondNumber=secondNumber*(10**(maxFractionalPart-numbersAfterPoint2));
        if(operator=="add") {
            result=firstNumber+secondNumber;
        }
        else if(operator=="minus")   {
            result=firstNumber-secondNumber;
        }
        else if(operator=="multi")  {
            result=firstNumber*secondNumber;
        }
        else    {
            result=firstNumber/secondNumber;
        }
        stringResult=result.toString();
        console.log(firstNumber+"=firstnumber");
        console.log(secondNumber+"=secondneumrb");
        console.log("result="+stringResult);
        if (operator=="add" || operator=="minus") {
            if(stringResult.length<=maxFractionalPart)   {
                stringResult = "0." + "0".repeat(maxFractionalPart-stringResult.length)+stringResult;
            }
            else {
                stringResult=stringResult.substring(0, stringResult.length-maxFractionalPart)+"."+stringResult.substring(stringResult.length-maxFractionalPart);
            }
        }
        else if(operator=="multi")  {
            if(stringResult.length<maxFractionalPart*2)   {
                stringResult = "0." + "0".repeat(maxFractionalPart*2-stringResult.length) + stringResult;
            }
            else {
                stringResult=stringResult.substring(0, stringResult.length-maxFractionalPart*2)+"."+stringResult.substring(stringResult.length-maxFractionalPart*2);
            }
        }
        while(stringResult.charAt(stringResult.length-1)=="0")   {
            stringResult=stringResult.substring(0, stringResult.length-1);
        }
    }
    else    {
        if(operator=="add") {
            result=firstNumber+secondNumber;
        }
        else if(operator=="minus")   {
            result=firstNumber-secondNumber;
        }
        else if(operator=="multi")  {
            result=firstNumber*secondNumber;
        }
        else    {
            result=firstNumber/secondNumber;
        }
        stringResult=result.toString();
    }
    if(stringResult.charAt(stringResult.length-1)==".") {
        stringResult=stringResult.replace(".", "");
    }
    return stringResult;
}