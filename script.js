
let totalIncome = 0;
let totalConsumption = 0;

const tbodyInc = document.getElementById("tableRowsInc");
const tbodyCons = document.getElementById("tableRowsCons");
const tbodyIncB = document.getElementById("tableRowsIncB");
const tbodyConsB = document.getElementById("tableRowsConsB");
const tbody = document.getElementById("tbody");

let table = new TableTimeLines('table', tbody);
let tableIncomeA = new Table('income', tbodyInc);
let tableConsumptionA = new Table('consumption', tbodyCons);
let tableIncomeB = new Table('incomePlanB', tbodyIncB);
let tableConsumptionB = new Table('consumptionPlanB', tbodyConsB);

function add() {
    table.add();
}

function addIncome() {
    tableIncomeA.add();
}

function addConsumption() {
    tableConsumptionA.add();
}

function addIncomeB() {
    tableIncomeB.add();
}

function addConsumptionB() {
    tableConsumptionB.add();
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

const plans = document.getElementById("plans");
plans.hidden = true;

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
    const isSimpleReport = document.getElementById("exampleRadios1");

    localStorage.setItem("settings", JSON.stringify({
        income: checkIncome.checked,
        consumption: checkConsumption.checked,
        comparison: flexCheckComparison.checked,
        periods: numberOfPeriods.value,
        deposit: deposit.value,
        isSimpleReport: isSimpleReport.checked
    }));

    updateVisibility();
}

function loadSettings() {
    let s = JSON.parse(localStorage.getItem("settings")) || {
        income: true,
        consumption: true,
        comparison: true,
        periods: 12,
        deposit: 0,
        isSimpleReport: true
    };

    document.getElementById("flexCheckIncome").checked = s.income;
    document.getElementById("flexCheckConsumption").checked = s.consumption;
    document.getElementById("flexCheckComparison").checked = s.comparison;
    document.getElementById("numberOfPeriods").value = s.periods;
    document.getElementById("exampleInputEmail1").value = s.deposit;
    document.getElementById("exampleRadios1").checked = s.isSimpleReport;
    document.getElementById("exampleRadios2").checked = !s.isSimpleReport;

    updateVisibility();
}

function updateVisibility() {
    const checkIncome = document.getElementById("flexCheckIncome");
    const checkConsumption = document.getElementById("flexCheckConsumption");
    const flexCheckComparison = document.getElementById("flexCheckComparison");

    document.getElementById("tableIncomeA").style.display = checkIncome.checked ? "table-row-group" : "none";
    document.getElementById("tableIncomeB").style.display = checkIncome.checked ? "table-row-group" : "none";
    document.getElementById("tableConsumptionA").style.display = checkConsumption.checked ? "table-row-group" : "none";
    document.getElementById("tableConsumptionB").style.display = checkConsumption.checked ? "table-row-group" : "none";
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

    if (this.pieIncome) this.pieIncome.style.display = 'none';
    if (this.pieConsumption) this.pieConsumption.style.display = 'none';
    if (this.pieIncomeB) this.pieIncomeB.style.display = 'none';
    if (this.pieConsumptionB) this.pieConsumptionB.style.display = 'none';


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
        const isSimpleReport = document.getElementById("exampleRadios1").checked;

        let calculation = new Calculation(
            tableIncomeA.getData(),
            tableConsumptionA.getData(),
            tableIncomeB.getData(),
            tableConsumptionB.getData(),
            numberOfPeriods,
            isSimpleReport,
            timeLines,
            theadRow,
            tbody);

        calculation.drawTable();

        const plans = document.getElementById("plans");
        plans.hidden = false;

      const incomeLabels = calculation.incomeItemsA.map(function (item) {
            return item.name;
        });

      const incomeAmounts = calculation.incomeItemsA.map(function (item) {
            return item.amount;
        });

      const consumptionLabels = calculation.consumptionItemsA.map(function (item) {
            return item.name;
        });

      const consumptionAmounts = calculation.consumptionItemsA.map(function (item) {
            return item.amount;
        });


      const incomeLabelsB = calculation.incomeItemsB.map(function (item) {
            return item.name;
        });

      const incomeAmountsB = calculation.incomeItemsB.map(function (item) {
            return item.amount;
        });

      const consumptionLabelsB = calculation.consumptionItemsB.map(function (item) {
            return item.name;
        });

      const consumptionAmountsB = calculation.consumptionItemsB.map(function (item) {
            return item.amount;
        });

        const checkIncome = document.getElementById("flexCheckIncome");
        const checkConsumption = document.getElementById("flexCheckConsumption");

        const canvasWrapper = document.getElementById("canvas-wrapper");
        canvasWrapper.innerHTML = '';

        const checkComparison = document.getElementById("flexCheckComparison");

        const planBText = document.getElementById("planBText");
        const planAText = document.getElementById("planAText");


    if (checkComparison.checked) {
            if (checkIncome.checked) {
                this.pieIncome = createPie("incomePie", incomeLabels, incomeAmounts, "Дохід");
                this.pieIncomeB = createPie("incomePieB", incomeLabelsB, incomeAmountsB, "Дохід");
                planBText.hidden = false; 
                planAText.hidden = false;
            }

            if (checkConsumption.checked) {
                this.pieConsumption = createPie("consumptionPie", consumptionLabels, consumptionAmounts, "Витрати");
                this.pieConsumptionB = createPie("consumptionPieB", consumptionLabelsB, consumptionAmountsB, "Витрати");
                planBText.hidden = false; 
                planAText.hidden = false; 
            }
        } else {
            this.pieIncome = createPie("incomePie", incomeLabels, incomeAmounts, "Дохід");
            this.pieConsumption = createPie("consumptionPie", consumptionLabels, consumptionAmounts, "Витрати");
            planBText.hidden = true; 
            planAText.hidden = true; 
        }  
    }, 100);
}


