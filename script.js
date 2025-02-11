const tbody = document.getElementById("work");

function add() {
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

      const check = document.getElementById("check");
      check.style.display = "block";  

      if (name || amount) {
        tdName.innerHTML = name;
        tdAmount.innerHTML = amount;
        tdSave.innerHTML = "";
        saveButton.style.display = "none";
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

    td.appendChild(saveButton);
    td.appendChild(deleteButton);
}

function checkbox() {
    const table = document.getElementById("myTable");
    const checkbox = document.getElementById("flexCheck");

    if (checkbox.checked) {
        table.style.visibility = "hidden"; 
    } else {
        table.style.visibility = "visible"; 
    }
}

 function check() {
    const checkBox = document.getElementById("");
    const money = document.getElementById("money");

    if (checkBox.checked) {
        checkBox.disabled = true;
    } else {
        checkBox.disabled = true;
    }
 }
 
