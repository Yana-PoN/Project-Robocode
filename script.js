
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
    const tableIncome = document.getElementById("tableIncomeBody");
    const checkIncome = document.getElementById("flexCheckIncome");

    if (checkIncome.checked) {
        tableIncome.style.visibility = "visible"; 
    } else {
        tableIncome.style.visibility = "hidden"; 
    }

    const tableConsumption = document.getElementById("tableConsumptionBody");
    const checkConsumption = document.getElementById("flexCheckConsumption");

    if (checkConsumption.checked) {
        tableConsumption.style.visibility = "visible";
    } else {
        tableConsumption.style.visibility = "hidden";
    } 

    const flexCheckComparison = document.getElementById("flexCheckComparison");
    const planB = document.getElementById("planB");

    if (flexCheckComparison.checked) {
        planB.hidden = false;
    } else {
        planB.hidden = true;
    }
}

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
        this.pieConsumption = createPie("consumptionPie", consumptionLabels, consumptionAmounts, "Розхід");
    }, 100);
}


