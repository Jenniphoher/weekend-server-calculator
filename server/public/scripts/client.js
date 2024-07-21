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
let operator;
let dataObj = {};

let number = '';
let symbol;
let orderArray = [];

onloadGet();

// ============================== OPERATOR/NUM/SYMBOL FUNCTION ============================== 

function thisOperator(event) {
    event.preventDefault();

    recentResult.innerHTML = '';

    operator = event.target.innerHTML;
    console.log('This is last item in array before operator:', orderArray.lastIndexOf());
    if (typeof orderArray.lastIndexOf() != 'number') {
        recentResult.innerHTML = 'no num';
        return false;
    } else {
        recentResult.innerHTML = `${operator}`;
    }
    console.log('This has been pressed:', operator);
    console.log('orderArray is now:', orderArray);

    order();
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ STRETCH ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function thisSymbol(event) {
    event.preventDefault();

    recentResult.innerHTML = '';

    symbol = event.target.innerHTML;
    if (typeof orderArray[orderArray,length - 1] != 'number') {
        recentResult.innerHTML = 'no num';
        return false;
    } else {
        recentResult.innerHTML = `${symbol}`;
    }
    console.log('This has been pressed:', symbol);
    console.log('orderArray is now:', orderArray);

    order();
}



function thisNum(event) {
    event.preventDefault();

    number = Number(event.target.innerHTML);
    recentResult.innerHTML += number;
    console.log('This has been pressed:', number);
    console.log('orderArray is now:', orderArray);

    order();
}



function order() {

    if(typeof number != 'number') {
        recentResult.innerHTML = '';
        return false;
    } else {
        orderArray.push(number);

        if(symbol === '.') {
            orderArray.push(symbol);
            symbol = '';
        } else if (typeof operator === 'string') {
            orderArray.push(operator);
            operator = 0;
        } 
    }
}

// ============================== POST && EQUAL BUTTON FUNCTION ============================== 

function equalButton(event) {
    event.preventDefault();

    const firstNum = document.querySelector('#numOne').valueAsNumber;
    const secondNum = document.querySelector('#numTwo').valueAsNumber;


    dataObj.numOne = firstNum;
    dataObj.numTwo = secondNum;
    dataObj.operator = operator;

    console.log('This is orderArray after equal:', orderArray);

    // ---------------------------------------- RESETS INPUTS
    formCalculator.reset();

    axios({
        method: 'POST',
        url: '/calculations',
        data: dataObj
    }).then((response) => {
        
        getResult();
        
    })
}

// ============================== GET RESULTS FUNCTION ============================== 

function getResult() {
    

    axios({
        method: 'GET',
        url: '/calculations'
    }) 
    .then((response) => {
        let data = response.data;
        console.log('This is data in GET:', data);
        let lastData = data[data.length - 1];

        // TRYING THINGS OUT FOR TEST = NOPE. DIDN'T WORK.
        // recentResult = document.querySelector('#recentResult');
        // recentResult.innerHTML = `${lastData.result}`;
        recentResult.innerHTML = `<span class="resultNum">${lastData.result}</span>`;
        resultHistory.innerHTML += ` 
            <li>${lastData.numOne} ${lastData.operator} ${lastData.numTwo} = ${lastData.result}</li>`;

    })
}

// ============================== DISPLAY RESULTS FUNCTION ============================== 

// function displayResult(data) {
//     console.log('This is data inside function:', data);
//     console.log('This is dataObj inside function:', dataObj);


// }

// ============================== CLEAR BUTTON FUNCTION ============================== 

function clearButton() {
    // ---------------------------------------- innerHTML/innerTEXT 
    recentResult.innerHTML = '';
    orderArray = [];
}

// ============================== GET ON LOAD FUNCTION ============================== 

function onloadGet() {
    window.addEventListener('load', () => {

        axios({
            method: 'GET',
            url: '/calculations'
        })
        .then((response) => {
            let data = response.data;
            for(let obj of data) {
                // ---------------------------------------- innerHTML/innerTEXT 
                resultHistory.innerHTML += ` 
                    <li>${obj.numOne} ${obj.operator} ${obj.numTwo} = ${obj.result}</li>
                `
            }
        })

    })
}
