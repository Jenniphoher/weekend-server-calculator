console.log('client.js is sourced!');

// make a GET && POST for all information.
// POST sends over an OBJECT with several properties.
// put the POST under the SUBMIT BUTTON.
// CREATE new INNERHTML for where to store and display DATA.
    // RECENT and LIST OF HISTORY.
//CREATE BUTTON that CLEARS all input.

const recentResults = document.querySelector('#recentResults');
const resultHistory = document.querySelector('#resultHistory');
const formCalculator = document.querySelector('#calculator');
let operator;

// ============================== POST && EQUAL BUTTON FUNCTION ============================== 

function thisOperator(event) {
    event.preventDefault();

    operator = event.target.innerHTML;
    console.log(operator);
}

function equalButton(event) {
    event.preventDefault();

    let firstNum = document.querySelector('#numOne').valueAsNumber;
    let secondNum = document.querySelector('#numTwo').valueAsNumber;

    let dataObj = {
        numOne: firstNum,
        numTwo: secondNum,
        operator: operator
    }

    console.log(dataObj);

    axios({
        method: 'POST',
        url: '/calculations',
        data: dataObj
    }).then((response) => {
        let data = response.data;

        // HOPE TO GET A NUMBER THAT WAS CALCULATED IN SERVER.

    })
}

// ============================== GET RESULTS FUNCTION ============================== 

function getResults() {

    axios({
        method: 'GET',
        url: '/calculations'
    }) 
    .then((response) => {
        let data = response.data;

    })
}

// ============================== CLEAR BUTTON FUNCTION ============================== 