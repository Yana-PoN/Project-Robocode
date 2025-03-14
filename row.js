class Row {

  status = 'Active';
  name = '';
  amount = 0;
  quantity = 0;
  price = 0;

  constructor(tableBody, table) {
    this.tbody = tableBody;
    this.table = table;
    this.createRow();
  }

  createRow() {
    this.tr = document.createElement("tr");

    this.tdName = document.createElement("td");

    this.tdPrice = document.createElement("td");

    this.tdQuantity = document.createElement("td");

    this.tdAmount = document.createElement("td");

    const tdButtons = document.createElement("td");
    

    this.tr.appendChild(this.tdName);
    this.tr.appendChild(this.tdPrice);
    this.tr.appendChild(this.tdQuantity);
    this.tr.appendChild(this.tdAmount);
    this.tr.appendChild(tdButtons);

    this.saveButton = document.createElement("button");
    this.saveButton.className = "custom-btn";
    this.saveButton.innerHTML = `<i class="bi bi-check2"></i>`;
    this.saveButton.onclick = this.saveButtonClick.bind(this);
    document.body.appendChild(this.saveButton);

    this.editButton = document.createElement("button");
    this.editButton.className = "custom-btn";
    this.editButton.innerHTML = `<i class="bi bi-highlighter"></i>`;
    this.editButton.onclick = this.editButtonClick.bind(this);
    document.body.appendChild(this.editButton);

    this.deleteButton = document.createElement("button"); 
    this.deleteButton.className = "custom-btn";
    this.deleteButton.innerHTML = `<i class="bi bi-trash"></i>`;
    this.deleteButton.onclick = this.deleteButtonClick.bind(this);
    document.body.appendChild(this.deleteButton);

    this.setInputsState(true);

    tdButtons.appendChild(this.saveButton);
    tdButtons.appendChild(this.editButton);
    tdButtons.appendChild(this.deleteButton);
    this.tbody.appendChild(this.tr);
  }

  saveButtonClick() {
    if (this.inputName.value && this.inputPrice.value && this.inputQuantity.value) {
      this.name = this.inputName.value;
      this.price = +this.inputPrice.value;
      this.quantity = +this.inputQuantity.value;
      this.amount = this.price * this.quantity;
      this.setInputsState(false);
      this.table.saveData();
    } else {
      alert("Please..");
      return;
    }
  }

  editButtonClick() {
    this.setInputsState(true);
  }

  deleteButtonClick() {
    this.tbody.removeChild(this.tr);
    this.status = 'Deleted';
    this.table.saveData();
  }

  setInputsState(isVisible) {
    if (isVisible) {
      this.tdName.innerHTML = '';
      this.tdAmount.innerHTML = '---';
      this.tdPrice.innerHTML = '';
      this.tdQuantity.innerHTML = '';
      // this.tdDate.innerHTML = '';
      
      // this.inputDate = document.createElement("input");
      // this.inputDate.type = "date";
      // this.inputDate.className = "form-control";
      // this.inputDate.value = this.date;  // Устанавливаем сохранённую дату, если она есть
      // this.tdDate.appendChild(this.inputDate);

      this.inputName = document.createElement("input");
      this.inputName.type = "text";
      this.inputName.placeholder = "Enter name";
      this.inputName.value = this.name;
      this.tdName.appendChild(this.inputName);

      this.inputName.addEventListener("keydown", function(event) {
        if (event.key === " ") {
            event.preventDefault(); 
        }
      });


      this.inputQuantity = document.createElement("input");
      this.inputQuantity.type = "number";
      this.inputQuantity.placeholder = "Enter number";
      this.inputQuantity.value = this.quantity;
      this.inputQuantity.min = 0;
      this.tdQuantity.appendChild(this.inputQuantity);


      this.inputPrice = document.createElement("input");
      this.inputPrice.type = "number";
      this.inputPrice.placeholder = "Enter number";
      this.inputPrice.value = this.price;
      this.inputPrice.min = 0;
      this.tdPrice.appendChild(this.inputPrice);


      // this.inputAmount = document.createElement("input");
      // this.inputAmount.type = "number";
      // this.inputAmount.placeholder = "Enter amount";
      // this.inputAmount.value = this.amount;
      // this.tdAmount.appendChild(this.inputAmount);

      this.saveButton.hidden = false;
      this.editButton.hidden = true;
    } else {
      this.tdName.innerHTML = this.name;
      this.tdAmount.innerHTML = this.amount;
      this.tdPrice.innerHTML = this.price;
      this.tdQuantity.innerHTML = this.quantity;
      // this.tdDate.innerHTML = this.date;

      this.saveButton.hidden = true;
      this.editButton.hidden = false;
    }
  }
}


