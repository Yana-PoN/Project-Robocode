
let totalIncome = 0;
let totalConsumption = 0;

const tbody = document.getElementById("work");
const tbody5 = document.getElementById("work5");

var table = new Table(tbody);
var table5 = new Table(tbody5);

function add() {
    this.table.add();
}

function add5() {
    this.table5.add();
}


function checkbox() {
    const table = document.getElementById("myTable");
    const checkbox = document.getElementById("flexCheck1");

    if (checkbox.checked) {
        table.style.visibility = "hidden"; 
    } else {
        table.style.visibility = "visible"; 
    }
}

function checkbox5() {
    const table = document.getElementById("myTable5");
    const checkbox = document.getElementById("flexCheck5");

    if (checkbox.checked) {
        table.style.visibility = "hidden"; 
    } else {
        table.style.visibility = "visible"; 
    }
}

function checkbox() {
    const table = document.getElementById("myTable");
    const checkbox = document.getElementById("flexCheckChecked1");

    if (checkbox.checked) {
        table.style.visibility = "visible"; 
    } else {
        table.style.visibility = "hidden"; 
    }
}

function checkbox5() {
    const table = document.getElementById("myTable5");
    const checkbox = document.getElementById("flexCheckChecked8");

    if (checkbox.checked) {
        table.style.visibility = "visible"; 
    } else {
        table.style.visibility = "hidden"; 
    }
}

function save() {
    const tableIncome = document.getElementById("tableBody");
    const checkbox = document.getElementById("flexCheckChecked8");

    if (checkbox.checked) {
        tableIncome.style.visibility = "visible"; 
    } else {
        tableIncome.style.visibility = "hidden"; 
    }

    const tableConsumption = document.getElementById("tableBody5");
    const checkbox1 = document.getElementById("flexCheckChecked9");

    if (checkbox1.checked) {
        tableConsumption.style.visibility = "visible";
    } else {
        tableConsumption.style.visibility = "hidden";
        tableIncome.style.display = "flex";
        tableIncome.style.justifyContent = "center";
        tableIncome.style.textAlign = "center";
    }
}




function calculation() {
    const theadRow = document.getElementById("calculationHead");
    // remove children
    theadRow.replaceChildren("");

    const tbody = document.getElementById("calculationBody");
    const p = document.getElementById("numberOfPeriods").value;
    let calculation = new Calculation(this.table.getData(), this.table5.getData(), p, theadRow, tbody);
    calculation.drawTable();
  }