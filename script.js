
let totalIncome = 0;
let totalConsumption = 0;

const tbodyInc = document.getElementById("tableRowsInc");
const tbodyCons = document.getElementById("tableRowsCons");
const tbodyIncB = document.getElementById("tableRowsIncB");
const tbodyConsB = document.getElementById("tableRowsConsB");
const tbody = document.getElementById("tbody");

let table = new TableTimeLines('table', tbody); 
let tableIncome = new Table('income', tbodyInc); 
let tableConsumption = new Table('consumption' ,tbodyCons);
let tableIncomePlanB = new Table('incomePlanB', tbodyIncB); 
let tableConsumptionPlanB = new Table('consumptionPlanB' ,tbodyConsB);

function add() {
    table.add();
}

function addIncome() {
    tableIncome.add();
    const addInc = document.getElementById("addInc");
    addInc.style.marginLeft = "40px";

    const deleteInc = document.getElementById("deleteInc");
    deleteInc.style.marginRight = "40px";
}

function addConsumption() {
    tableConsumption.add();
    const addCons = document.getElementById("addCons");
    addCons.style.marginLeft = "40px";

    const deleteCons = document.getElementById("deleteCons");
    deleteCons.style.marginRight = "40px";
}

function addIncomeB() {
    tableIncomePlanB.add();
    const addIncB = document.getElementById("addIncB");
    addIncB.style.marginLeft = "80px";

    const deleteIncB = document.getElementById("deleteIncB");
    deleteIncB.style.marginRight = "80px";
}

function addConsumptionB() {
    tableConsumptionPlanB.add();
    const addConsB = document.getElementById("addConsB");
    addConsB.style.marginLeft = "80px";

    const deleteConsB = document.getElementById("deleteConsB");
    deleteConsB.style.marginRight = "80px";
}

function startTable() {
    tableIncome.fillData();
    tableConsumption.fillData();
    tableIncomePlanB.fillData();
    tableConsumptionPlanB.fillData();
    table.fillData();
}

startTable();

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
        tableConsumption.rows = [];
    }

function deleteIncomeB() {
    let tbodyIncomeB = document.getElementById("tableRowsIncB");

    if (tbodyIncomeB) {
        tbodyIncomeB.replaceChildren("");
    }

        localStorage.removeItem("incomePlanB");
        tableIncomePlanB.rows = [];
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
    const theadRow = document.getElementById("calculationHead");
    theadRow.replaceChildren("");

    const tbody = document.getElementById("calculationBody");
    tbody.replaceChildren("");
    
    const numberOfPeriods = document.getElementById("numberOfPeriods").value;
    let calculation = new Calculation(tableIncome.getData(), tableConsumption.getData(), numberOfPeriods, theadRow, tbody);
    calculation.drawTable();

    const incomeLabels = tableIncome.getData().map(function(item) {
        return item.name;
    })

    const incomeAmounts = tableIncome.getData().map(function(item) {
        return item.amount;
    })

    const consumptionLabels = tableConsumption.getData().map(function(item) {
        return item.name;
    })

    const consumptionAmounts = tableConsumption.getData().map(function(item) {
        return item.amount;
    })

    createPie("incomePie", incomeLabels, incomeAmounts);
    createPie("consumptionPie", consumptionLabels, consumptionAmounts);
  }