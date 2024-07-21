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

const recentResult = document.querySelector('#recentResult');
const resultHistory = document.querySelector('#resultHistory');
const formCalculator = document.querySelector('#calculator');
let operator;
let dataObj = {};

onloadGet();

// ============================== OPERATOR FUNCTION ============================== 

function thisOperator(event) {
    event.preventDefault();

    operator = event.target.innerHTML;
    console.log(operator);
}

// ============================== POST && EQUAL BUTTON FUNCTION ============================== 

function equalButton(event) {
    event.preventDefault();

    const firstNum = document.querySelector('#numOne').valueAsNumber;
    const secondNum = document.querySelector('#numTwo').valueAsNumber;


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
        
        recentResult.innerHTML = lastData.result;
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
