//import { Table } from 'Table';


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

function add1() {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.placeholder = "Enter name";
    tdName.appendChild(inputName);
    
    const tdAmount = document.createElement("td");
    const inputAmount = document.createElement("input");
    inputAmount.type = "number";
    inputAmount.placeholder = "Enter amount";
    tdAmount.appendChild(inputAmount);

    const tdButtons = document.createElement("td");

    tr.appendChild(tdName);
    tr.appendChild(tdAmount);

    tr.appendChild(tdButtons);
    tbody.appendChild(tr);


   
    addButtons(tr, tdButtons, inputName, inputAmount, tdName, tdAmount);
}

 function addButtons(tr, td, inputName, inputAmount, tdName, tdAmount) {
    
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    
    saveButton.onclick = function() {
      const name = inputName.value;
      const amount = inputAmount.value;
      if (name || amount) {
        tdName.innerHTML = name;
        tdAmount.innerHTML = amount;
        saveButton.hidden = true;
      } else {
        alert("Please..");
        return;
      }
    }

    

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.onclick = function() {
        tbody.removeChild(tr);
        const check = document.getElementById("check");
        check.style.visibility = "hidden";
    }

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    editButton.onclick = function() {

        const editInputName = document.createElement("input");
        editInputName.type = "text";
        editInputName.value = tdName.textContent;  
        tdName.appendChild(editInputName);

        const editInputAmount = document.createElement("input");
        editInputAmount.type = "number";
        editInputAmount.value = tdAmount.textContent; 
        tdAmount.appendChild(editInputAmount);

        editButton.hidden = true;

        saveButton.hidden = false;
    }

    td.appendChild(saveButton);
    td.appendChild(deleteButton);
    td.appendChild(editButton);
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
 
// function calculation() {
//     const amount = parseFloat(document.getElementById("amountInput").value);

//     if (amount > 0) {
//         document.getElementById("calculationTable").hidden = false;
//     } else {
//         alert("Please enter a valid amount!");
//         return;
//     }
// }


// Create global variables to store total income and total consumption


function add() {
    this.table.add();
}

function add5() {
    this.table5.add();
}


function add1() {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.placeholder = "Enter name";
    tdName.appendChild(inputName);
    
    const tdAmount = document.createElement("td");
    const inputAmount = document.createElement("input");
    inputAmount.type = "number";
    inputAmount.placeholder = "Enter amount";
    tdAmount.appendChild(inputAmount);

    const tdButtons = document.createElement("td");

    tr.appendChild(tdName);
    tr.appendChild(tdAmount);
    tr.appendChild(tdButtons);
    tbody.appendChild(tr);

    addButtons(tr, tdButtons, inputName, inputAmount, tdName, tdAmount);
}

function add5Buttons(tr, td, inputName, inputAmount, tdName, tdAmount) {
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    
    saveButton.onclick = function() {
      const name = inputName.value;
      const amount = inputAmount.value;
      if (name || amount) {
        tdName.innerHTML = name;
        tdAmount.innerHTML = amount;

        totalConsumption += parseFloat(amount);
        saveButton.hidden = true;
      } else {
        alert("Please..");
        return;
      }
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.onclick = function() {
        tbody.removeChild(tr);
        const check = document.getElementById("check");
        check.style.visibility = "hidden";
    }

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    editButton.onclick = function() {
        const editInputName = document.createElement("input");
        editInputName.type = "text";
        editInputName.value = tdName.textContent;  
        tdName.appendChild(editInputName);

        const editInputAmount = document.createElement("input");
        editInputAmount.type = "number";
        editInputAmount.value = tdAmount.textContent; 
        tdAmount.appendChild(editInputAmount);

        editButton.hidden = true;
        saveButton.hidden = false;
    }

    td.appendChild(saveButton);
    td.appendChild(deleteButton);
    td.appendChild(editButton);
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


function calculation() {

    if(amount > 0) {
        const tableCalculation = document.getElementById("tableCalculation");
        tableCalculation.style.display = "block";

        const tr5 = document.createElement("tr");

        const tdName5 = document.createElement("td");
        
        const tdAmount5 = document.createElement("td");
        const tdButtons5 = document.createElement("td");

        tr.appendChild(tdName5);
        tr.appendChild(tdAmount5);
        tr.appendChild(tdButtons5);
        tbody.appendChild(tr5);

        const deleteButton5 = document.createElement("button");
        deleteButton5.textContent = "Delete";

        deleteButton5.onclick = function() {
            tbody.removeChild(tr);
        }
        td.appendChild(deleteButton5);
    } else {
        alert("pon");
    }
    
}
       
   


    // const remainingAmount = totalIncome - totalConsumption;

    // if (remainingAmount >= 0) {
    //     document.getElementById("calculationTable").hidden = false;

    //     const tbodyCalculation = document.getElementById("incomeConsumptionCalculation");
    //     tbodyCalculation.innerHTML = ""; 

    //     const tr = document.createElement("tr");
        
    //     const tdIncome = document.createElement("td");
    //     tdIncome.textContent = `Income: ${totalIncome}`;
        
    //     const tdConsumption = document.createElement("td");
    //     tdConsumption.textContent = `Consumption: ${totalConsumption}`;
        
    //     const tdRemaining = document.createElement("td");
    //     tdRemaining.textContent = `Remaining: ${remainingAmount}`;

    //     tr.appendChild(tdIncome);
    //     tr.appendChild(tdConsumption);
    //     tr.appendChild(tdRemaining);

    //     tbodyCalculation.appendChild(tr);
    // } else {
    //     alert("Please!");
    //     return;
    // }

    
    

