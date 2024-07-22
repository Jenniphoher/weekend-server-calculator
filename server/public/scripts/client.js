console.log('client.js is sourced!');

// make a GET && POST for all information.
// POST sends over an OBJECT with several properties.
// put the POST under the SUBMIT BUTTON.
// CREATE new INNERHTML for where to store and display DATA.
    // RECENT and LIST OF HISTORY.
//CREATE BUTTON that CLEARS all input.

// DETAILS:
    // 1. Clear input after clicking submit
    // 2. Clear innerHTML when needed

let recentResult = document.querySelector('#recentResult');
let resultHistory = document.querySelector('#resultHistory');
let formCalculator = document.querySelector('#calculator');
let operator = 0;
let dataObj = {};

// let number = '';
// let symbol;
// let orderArray = [];

onloadGet();

// ============================== OPERATOR/NUM/SYMBOL FUNCTION ============================== 

function thisOperator(event) {
    event.preventDefault();

    // recentResult.innerHTML = '';

    operator = event.target.innerHTML;
    // if (typeof orderArray.lastIndexOf() != 'number') {
    //     recentResult.innerHTML = '';
    //     return false;
    // } else {
    //     recentResult.innerHTML = `<span class="resultNum">${operator}</span>`;
    // }
    // console.log('This has been pressed:', operator);
    // console.log('orderArray is now:', orderArray);

    // order(event);
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ STRETCH FUNCTIONS
// function thisSymbol(event) {
//     event.preventDefault();

//     symbol = event.target.innerHTML;
//     if (typeof orderArray.lastIndexOf() != 'number') {
//         recentResult.innerHTML = '';
//         return false;
//     } else {
//         recentResult.innerHTML += `<span class="resultNum">${symbol}</span>`;
//     }
//     console.log('This has been pressed:', symbol);
//     console.log('orderArray is now:', orderArray);

//     order(event);
// }



// function thisNum(event) {
//     event.preventDefault();

//     console.log('This is last item of orderArray:', orderArray[orderArray.length - 1]);
//     console.log('This is operator:', operator);
//     if(orderArray[orderArray.length - 1] === '+' 
//         || orderArray[orderArray.length - 1] === '-'
//         || orderArray[orderArray.length - 1] === '*'
//         || orderArray[orderArray.length - 1] === '/') {
//         recentResult.innerHTML = ''
//     }
//     number = Number(event.target.innerHTML);

//     recentResult.innerHTML += `<span class="resultNum">${number}</span>`;

//     console.log('This has been pressed:', number);
//     console.log('orderArray is now:', orderArray);

//     order(event);
// }



// function order(event) {

//     if(typeof number != 'number') {
//         recentResult.innerHTML = '';
//         return false;
//     } else if(Number(event.target.innerHTML) === number) {
//         orderArray.push(number);
//         number = 0;
//     } else if(event.target.innerHTML === symbol) {
//         orderArray.push(symbol);
//         symbol = '';
//     } else if(event.target.innerHTML === operator) {
//         orderArray.push(operator);
//         operator = 0;
//     }
// }

// ============================== POST && EQUAL BUTTON FUNCTION ============================== 

function equalButton(event) {
    event.preventDefault();

    let firstNum = document.querySelector('#numOne').valueAsNumber;
    let secondNum = document.querySelector('#numTwo').valueAsNumber;

    dataObj.numOne = firstNum;
    dataObj.numTwo = secondNum;
    dataObj.operator = operator;
    
    // ---------------------------------------- RESETS INPUTS
    formCalculator.reset();

    axios({
        method: 'POST',
        url: '/calculations',
        data: dataObj
    }).then((response) => {
        
        onloadGet();
        
    })
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ STRETCH OBJECT FUNCTIONS

// function getTheNum() {
//     let firstNum = 0;
//     let firstNumberArray = [];
//     let secondNumberArray = [];

//     console.log('This is orderArray before looping:', orderArray);
//     for(let item of orderArray) {
//         if(item === '+' 
//             || item === '-'
//             || item === '*'
//             || item === '/') {
//             console.log('Item in orderArray that is a STRING is:', item);
//             let opIndex = orderArray.indexOf(item);
//             orderArray.splice(opIndex, 1);
//             break;
//         } else {
//             console.log('Item in orderArray that is a NUMBER or . is:', item);
//             firstNumberArray.push(item);
//             let index = orderArray.indexOf(item);
//             orderArray.splice(index, 1);
//             console.log('This is firstNumArray HERE:', firstNumberArray);
//         }
//     }

//     for(let item of orderArray) {
//         if(item === '+' 
//             || item === '-'
//             || item === '*'
//             || item === '/') {
//             console.log('Item in orderArray that is a STRING is:', item);
//             let opIndex = orderArray.indexOf(item);
//             orderArray.splice(opIndex, 1);
//         } else {
//             console.log('Item in orderArray that is a NUMBER or . is:', item);
//             secondNumberArray.push(item);
//             let index = orderArray.indexOf(item);
//             orderArray.splice(index, 1);
//             console.log('This is firstNumArray HERE:', secondNumberArray);
//         }
//     }

    

//     firstNum = firstNumberArray.join('');
//     console.log('This is firstNum:', firstNum);
//     secondNum= secondNumberArray.join('');
//     return [firstNum, secondNum];
// }


// ============================== GET RESULTS FUNCTION ============================== 

// function getResult() {
    
//     axios({
//         method: 'GET',
//         url: '/calculations'
//     }) 
//     .then((response) => {
//         let data = response.data;
//         // if statement
//         if(data.length === 0) {
//             // error?
//         } else {
//             let lastData = data[data.length - 1];

//             recentResult.innerHTML = `<span class="resultNum">${lastData.result}</span>`;
//         }

//         for(let obj of data) {
//             // ---------------------------------------- innerHTML/innerTEXT 
//             resultHistory.innerHTML += ` 
//                 <li>${obj.numOne} ${obj.operator} ${obj.numTwo} = ${obj.result}</li>
//             `
//         }

//     })
// }

// getResult();

// ============================== DISPLAY RESULTS FUNCTION ============================== 

// function displayResult(data) {
//     console.log('This is data inside function:', data);
//     console.log('This is dataObj inside function:', dataObj);


// }

// ============================== CLEAR BUTTON FUNCTION ============================== 

function clearButton(event) {
    // ---------------------------------------- innerHTML/innerTEXT 
    formCalculator.reset();
    // orderArray = [];
}

// ============================== GET ON LOAD FUNCTION ============================== 

function onloadGet() {

    axios({
        method: 'GET',
        url: '/calculations'
    })
    .then((response) => {
        let data = response.data;
        // if statement
        if(data.length === 0) {
            // error?
        } else {
            let lastData = data[data.length - 1];
            recentResult.innerHTML = '';
            
            recentResult.innerHTML = `<span class="resultNum">${lastData.result}</span>`;
        }
            resultHistory.innerHTML = '';
        for(let obj of data) {
            // ---------------------------------------- innerHTML/innerTEXT 
            resultHistory.innerHTML += ` 
                <li>${obj.numOne} ${obj.operator} ${obj.numTwo} = ${obj.result}</li>
            `
            console.log("this is obj:", obj);
        }
    })

}
