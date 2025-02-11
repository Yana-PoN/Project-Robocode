class Row {

    id;
    tbody;
    tr;

    inputName;
    inputAmount;

    tdName;
    tdAmount;

    saveButton;

    constructor(tableBody, id) {
        this.tbody = tableBody;
        this.id = id;
        this.createRow();
    }

    createRow()
    {
        this.tr = document.createElement("tr");
    
        this.tdName = document.createElement("td");
        this.inputName = document.createElement("input");
        this.inputName.type = "text";
        this.inputName.placeholder = "Enter name";
        this.tdName.appendChild(this.inputName);
        
        this.tdAmount = document.createElement("td");
        this.inputAmount = document.createElement("input");
        this.inputName.type = "number";
        this.inputAmount.placeholder = "Enter amount";
        this.tdAmount.appendChild(this.inputAmount);
    
        const tdButtons = document.createElement("td");
    
        this.tr.appendChild(this.tdName);
        this.tr.appendChild(this.tdAmount);
    
        this.tr.appendChild(tdButtons);
        this.tbody.appendChild(this.tr);

        // Create Buttons

        this.saveButton = document.createElement("button");
        this.saveButton.textContent = "Save";
        
        this.saveButton.onclick = this.saveButtonClick;
    
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
    
        deleteButton.onclick = this.deleteButtonClick
    
        tdButtons.appendChild(this.saveButton);
        tdButtons.appendChild(deleteButton);
    }

    saveButtonClick() {
        const name = this.inputName.value;
          const amount = this.inputAmount.value;
          if (name || amount) {
            this.tdName.innerHTML = name;
            this.tdAmount.innerHTML = amount;
            this.saveButton.hidden = true;
          } else {
            alert("Please..");
            return;
          }
    }

    deleteButtonClick() {
        this.tbody.removeChild(this.tr);
        const check = document.getElementById("check");
        check.style.visibility = "hidden";
    }
}