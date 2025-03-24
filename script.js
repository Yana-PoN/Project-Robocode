
let totalIncome = 0;
let totalConsumption = 0;

const tbodyInc = document.getElementById("tableRowsInc");
const tbodyCons = document.getElementById("tableRowsCons");
const tbodyIncB = document.getElementById("tableRowsIncB");
const tbodyConsB = document.getElementById("tableRowsConsB");
const tbody = document.getElementById("tbody");

let table = new TableTimeLines('table', tbody); 
let tableIncomeA = new Table('income', tbodyInc); 
let tableConsumptionA = new Table('consumption' ,tbodyCons);
let tableIncomeB = new Table('incomePlanB', tbodyIncB); 
let tableConsumptionB = new Table('consumptionPlanB' ,tbodyConsB);

function add() {
    table.add();
}

function addIncome() {
    tableIncomeA.add();
    const addInc = document.getElementById("addInc");
    addInc.style.marginLeft = "40px";

    const deleteInc = document.getElementById("deleteInc");
    deleteInc.style.marginRight = "40px";
}

function addConsumption() {
    tableConsumptionA.add();
    const addCons = document.getElementById("addCons");
    addCons.style.marginLeft = "40px";

    const deleteCons = document.getElementById("deleteCons");
    deleteCons.style.marginRight = "40px";
}

function addIncomeB() {
    tableIncomeB.add();
    const addIncB = document.getElementById("addIncB");
    addIncB.style.marginLeft = "80px";

    const deleteIncB = document.getElementById("deleteIncB");
    deleteIncB.style.marginRight = "80px";
}

function addConsumptionB() {
    tableConsumptionB.add();
    const addConsB = document.getElementById("addConsB");
    addConsB.style.marginLeft = "80px";

    const deleteConsB = document.getElementById("deleteConsB");
    deleteConsB.style.marginRight = "80px";
}

function startTable() {
    tableIncomeA.fillData();
    tableConsumptionA.fillData();
    tableIncomeB.fillData();
    tableConsumptionB.fillData();
    table.fillData();
}

startTable();

const spinner = document.getElementById("spinner");
spinner.hidden = true;

function deleteIncome() {
    let tbodyIncome = document.getElementById("tableRowsInc");

    if (tbodyIncome) {
        tbodyIncome.replaceChildren("");
    }

        localStorage.removeItem("income");
        tbodyIncome.rows = [];
}


function deleteConsumption() {
    let tbodyConsumption = document.getElementById("tableRowsCons");

    if (tbodyConsumption) {
        tbodyConsumption.replaceChildren("");
    }

        localStorage.removeItem("consumption");
        tableConsumptionA.rows = [];
    }

function deleteIncomeB() {
    let tbodyIncomeB = document.getElementById("tableRowsIncB");

    if (tbodyIncomeB) {
        tbodyIncomeB.replaceChildren("");
    }

        localStorage.removeItem("incomePlanB");
        tableIncomeB.rows = [];
}


function deleteConsumptionB() {
    let tbodyConsumptionB = document.getElementById("tableRowsConsB");

    if (tbodyConsumptionB) {
        tbodyConsumptionB.replaceChildren("");
    }

        localStorage.removeItem("consumptionPlanB");
        tbodyConsumptionB.rows = [];
    }


function save() {
    const checkIncome = document.getElementById("flexCheckIncome");
    const checkConsumption = document.getElementById("flexCheckConsumption");
    const flexCheckComparison = document.getElementById("flexCheckComparison");
    const numberOfPeriods = document.getElementById("numberOfPeriods");
    const deposit = document.getElementById("exampleInputEmail1");

    localStorage.setItem("settings", JSON.stringify({
        income: checkIncome.checked,
        consumption: checkConsumption.checked,
        comparison: flexCheckComparison.checked,
        periods: numberOfPeriods.value,
        deposit: deposit.value
    }));

    updateVisibility(); 
}

function loadSettings() {
    let s = JSON.parse(localStorage.getItem("settings")) || {
        income: true,
        consumption: true,
        comparison: true,
        periods: 12,
        deposit: 0
    };

    document.getElementById("flexCheckIncome").checked = s.income;
    document.getElementById("flexCheckConsumption").checked = s.consumption;
    document.getElementById("flexCheckComparison").checked = s.comparison;
    document.getElementById("numberOfPeriods").value = s.periods;
    document.getElementById("exampleInputEmail1").value = s.deposit;

    updateVisibility(); 
}

function updateVisibility() {
    const checkIncome = document.getElementById("flexCheckIncome");
    const checkConsumption = document.getElementById("flexCheckConsumption");
    const flexCheckComparison = document.getElementById("flexCheckComparison");

    document.getElementById("tableIncomeBody").style.display = checkIncome.checked ? "table-row-group" : "none";
    document.getElementById("tableConsumptionBody").style.display = checkConsumption.checked ? "table-row-group" : "none";
    document.getElementById("planB").style.display = flexCheckComparison.checked ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", loadSettings);


const CheckQuantity = document.getElementById("flexCheckQuantity");
const deposit = document.getElementById("deposit");


CheckQuantity.addEventListener("change", function () {
    if (CheckQuantity.checked) {
        deposit.style.visibility = "visible"; 
    } else {
        deposit.style.visibility = "hidden"; 
    }
});




function calculation() {
    const spinner = document.getElementById("spinner");
    const theadRow = document.getElementById("calculationHead");
    const tbody = document.getElementById("calculationBody");

    if (this.pieIncome) {
        this.pieIncome.style.display = 'none';
    }

    if (this.pieConsumption) {
        this.pieConsumption.style.display = 'none';
    }

    spinner.hidden = false; 
    theadRow.replaceChildren("");
    tbody.replaceChildren("");

    setTimeout(() => {
        spinner.hidden = true; 

      let store = localStorage.getItem('table');
      let timeLines = null;
      if (store) {
        timeLines = JSON.parse(store);
      }

      const numberOfPeriods = document.getElementById("numberOfPeriods").value;
      let calculation = new Calculation(
        tableIncomeA.getData(),
        tableConsumptionA.getData(),
        tableIncomeB.getData(),
        tableConsumptionB.getData(),
        numberOfPeriods, null,
        timeLines,
        theadRow,
        tbody);
        calculation.drawTable();

        const incomeLabels = tableIncomeA.getData().map(function(item) {
            return item.name;
        });

        const incomeAmounts = tableIncomeA.getData().map(function(item) {
            return item.amount;
        });

        const consumptionLabels = tableConsumptionA.getData().map(function(item) {
            return item.name;
        });

        const consumptionAmounts = tableConsumptionA.getData().map(function(item) {
            return item.amount;
        });

        if (this.pieIncome) {
            this.pieIncome.style.display = "block";
        }

        if (this.pieConsumption) {
            this.pieConsumption.style.display = "block";
        }

        this.pieIncome = createPie("incomePie", incomeLabels, incomeAmounts, "Дохід");
        this.pieConsumption = createPie("consumptionPie", consumptionLabels, consumptionAmounts, "Витрати");
    }, 100);
}


