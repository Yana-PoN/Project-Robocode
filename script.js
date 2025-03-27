
let totalIncome = 0;
let totalConsumption = 0;

const tbodyInc = document.getElementById("tableRowsInc");
const tbodyCons = document.getElementById("tableRowsCons");
const tbodyIncB = document.getElementById("tableRowsIncB");
const tbodyConsB = document.getElementById("tableRowsConsB");
const tbody = document.getElementById("tbody");

let table = new TableTimeLines('table', tbody);

const deleteIncA = document.getElementById("deleteInc");
const deleteConsA = document.getElementById("deleteCons");
const deleteIncB = document.getElementById("deleteIncB");
const deleteConsB = document.getElementById("deleteConsB");

let tableIncomeA = new Table('income', tbodyInc, deleteIncA);
let tableConsumptionA = new Table('consumption', tbodyCons, deleteConsA);
let tableIncomeB = new Table('incomePlanB', tbodyIncB, deleteIncB);
let tableConsumptionB = new Table('consumptionPlanB', tbodyConsB, deleteConsB);

const checkIncome = document.getElementById("flexCheckIncome");
const checkConsumption = document.getElementById("flexCheckConsumption");

checkIncome.addEventListener("change", () => {
    checkConsumption.disabled = !checkIncome.checked;
  });

checkConsumption.addEventListener("change", () => {
    checkIncome.disabled = !checkConsumption.checked;
  });

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

function copyPlanAIncome() {
    deleteIncomeB();
    const data = tableIncomeA.getData();
    tableIncomeB.fillData(data);
    tableIncomeB.saveData();
}

function copyPlanAConsumption() {
    deleteConsumptionB();
    const data = tableConsumptionA.getData();
    tableConsumptionB.fillData(data);
    tableConsumptionB.saveData();
}


function save() {
    const checkIncome = document.getElementById("flexCheckIncome");
    const checkConsumption = document.getElementById("flexCheckConsumption");
    const flexCheckComparison = document.getElementById("flexCheckComparison");
    const numberOfPeriods = document.getElementById("numberOfPeriods");
    const deposit = document.getElementById("exampleInputEmail1");
    const isSimpleReport = document.getElementById("exampleRadios1");

    let isErrors = false;
    if (numberOfPeriods.value.trim() === "" || +numberOfPeriods.value < 1 || +numberOfPeriods.value > 100) {
        setError(numberOfPeriods);
        isErrors = true;
    }

    numberOfPeriods.addEventListener("keydown", function (event) {
        event.currentTarget.className = "form-control";
      });

    if (deposit.value.trim() === "" || +deposit.value < 0) {
        setError(deposit);
        isErrors = true;
    }

    deposit.addEventListener("keydown", function (event) {
        event.currentTarget.className = "form-control";
      });

    if (isErrors) {
        return;
    }

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

function setError(input) {
    input.className = "form-control is-invalid";
    input.required = true;
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

    if (checkIncome.checked) {
        document.getElementById("tableIncomeA").style.display = "table-row-group";
        document.getElementById("tableIncomeB").style.display = "table-row-group";
    } else {
        document.getElementById("tableIncomeA").style.display = "none";
        document.getElementById("tableIncomeB").style.display = "none";
    }
    
    if (checkConsumption.checked) {
        document.getElementById("tableConsumptionA").style.display = "table-row-group";
        document.getElementById("tableConsumptionB").style.display = "table-row-group";
    } else {
        document.getElementById("tableConsumptionA").style.display = "none";
        document.getElementById("tableConsumptionB").style.display = "none";
    }
    
    if (flexCheckComparison.checked) {
        document.getElementById("planB").style.display = "block";
    } else {
        document.getElementById("planB").style.display = "none";
    }
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

        const diagramLabelsA = calculation.diagramItemsA.map(function (item) {
            return item.name;
        });

        const diagramAmountsA = calculation.diagramItemsA.map(function (item) {
            return item.amount;
        });

        const diagramLabelsB = calculation.diagramItemsB.map(function (item) {
            return item.name;
        });

        const diagramAmountsB = calculation.diagramItemsB.map(function (item) {
            return item.amount;
        });

        const checkIncome = document.getElementById("flexCheckIncome");
        const checkConsumption = document.getElementById("flexCheckConsumption");

        const canvasWrapper = document.getElementById("canvas-wrapper");
        canvasWrapper.innerHTML = '';

        const checkComparison = document.getElementById("flexCheckComparison");

        if (checkComparison.checked) {

            if (checkIncome.checked) {
                this.pieIncome = createPie("incomePie", incomeLabels, incomeAmounts, "Дохід план А");
                this.pieIncomeB = createPie("incomePieB", incomeLabelsB, incomeAmountsB, "Дохід план Б");
            }

            if (checkConsumption.checked) {
                this.pieConsumption = createPie("consumptionPie", consumptionLabels, consumptionAmounts, "Витрати план А");
                this.pieConsumptionB = createPie("consumptionPieB", consumptionLabelsB, consumptionAmountsB, "Витрати план Б");
            }
        } else {
            this.pieIncome = createPie("incomePie", incomeLabels, incomeAmounts, "Дохід");
            this.pieConsumption = createPie("consumptionPie", consumptionLabels, consumptionAmounts, "Витрати");
        }

        this.diagramA = createDiagram("diagramA", Array.from({length: calculation.periodsCount}, (_, i) => "P" + (i + 1)), calculation.balanceValuesA, "Баланс план А");
        this.diagramB = createDiagram("diagramB", Array.from({length: calculation.periodsCount}, (_, i) => "P" + (i + 1)), calculation.balanceValuesB, "Баланс план Б");


    }, 100);
}

function round(value) {
    return Math.round(value * 100) / 100;
  }


