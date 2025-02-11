class Table{
    
    tbody;
    rows = [];

    constructor(tableBody) {
        this.tbody = tableBody;
    }

    add() {
        let row = new Row(this.tbody);
    }
    
    addButtons(tr, td, inputName, inputAmount, tdName, tdAmount) {
        
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
    
        td.appendChild(saveButton);
        td.appendChild(deleteButton);
    }
    
    checkbox() {
        const table = document.getElementById("myTable");
        const checkbox = document.getElementById("flexCheck");
    
        if (checkbox.checked) {
            table.style.visibility = "hidden"; 
        } else {
            table.style.visibility = "visible"; 
        }
    }
    
    check() {
        const checkBox = document.getElementById("");
        const money = document.getElementById("money");
    
        if (checkBox.checked) {
            checkBox.disabled = true;
        } else {
            checkBox.disabled = true;
        }
     }
}