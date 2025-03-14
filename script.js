
let totalIncome = 0;
let totalConsumption = 0;

const tbodyInc = document.getElementById("tableRowsInc");
const tbodyCons = document.getElementById("tableRowsCons");
const tbody = document.getElementById("tbody");

let table = new TableTimeLines('table', tbody); 
let tableIncome = new Table('income', tbodyInc); 
let tableConsumption = new Table('consumption' ,tbodyCons);

function add() {
    table.add();
}

function addIncome() {
    tableIncome.add();
}

function addConsumption() {
    tableConsumption.add();
}

function startTable() {
    tableIncome.fillData();
    tableConsumption.fillData();
    table.fillData();
}

startTable();

function checkboxIncome() {
    const checkIncome = document.getElementById("flexSwitchCheckIncome"); 
    const disabledCheckIncomeDiv = document.getElementById("flexSwitchCheckIncomeDisabled").parentElement; // Div с отключённым чекбоксом
    const checkIncomeDiv = checkIncome.parentElement; // Div с основным чекбоксом
    const tbodyIncome = document.getElementById("tableRowsInc");

    if (checkIncome.checked) {
        disabledCheckIncomeDiv.className = "form-check form-switch d-none";
        checkIncomeDiv.className = "form-check form-switch";
    } else {
        checkIncomeDiv.className = "form-check form-switch d-none";
        disabledCheckIncomeDiv.className = "form-check form-switch";
        

        localStorage.removeItem("income");

        tableIncome.rows = [];

        tbodyIncome.innerHTML = "";

        tbodyIncome?.parentElement?.removeChild(tbodyIncome);
    }
}

function checkboxConsumption() {
    const checkConsumption = document.getElementById("flexSwitchCheckConsumption"); 
    const disabledCheckConsumptionDiv = document.getElementById("flexSwitchConsumptionDisabled").parentElement; // Div с отключённым чекбоксом
    const checkConsumptionDiv = checkConsumption.parentElement; // Div с основным чекбоксом
    const tbodyConsumption = document.getElementById("tableRowsCons");

    if (checkConsumption.checked) {
        disabledCheckConsumptionDiv.className = "form-check form-switch d-none";
        checkConsumptionDiv.className = "form-check form-switch";
    } else {
        checkConsumptionDiv.className = "form-check form-switch d-none";
        disabledCheckConsumptionDiv.className = "form-check form-switch"

        localStorage.removeItem("consumption");

        tableConsumption.rows = [];

        tbodyConsumption.innerHTML = "";

        tbodyConsumption?.parentElement?.removeChild(tbodyConsumption);
    }
}

function save() {
    const tableIncome = document.getElementById("tableBody");
    const checkIncome = document.getElementById("flexCheckIncome");

    if (checkIncome.checked) {
        tableIncome.style.visibility = "visible"; 
    } else {
        tableIncome.style.visibility = "hidden"; 
    }

    const tableConsumption = document.getElementById("tableBody5");
    const checkConsumption = document.getElementById("flexCheckConsumption");

    if (checkConsumption.checked) {
        tableConsumption.style.visibility = "visible";
    } else {
        tableConsumption.style.visibility = "hidden";
    }
}




function calculation() {
    const theadRow = document.getElementById("calculationHead");
    theadRow.replaceChildren("");

    const tbody = document.getElementById("calculationBody");
    tbody.replaceChildren("");
    
    const numberOfPeriods = document.getElementById("numberOfPeriods").value;
    let calculation = new Calculation(tableIncome.getData(), tableConsumption.getData(), numberOfPeriods, theadRow, tbody);
    calculation.drawTable();
  }

  