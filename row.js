class Row {

  status = 'Active';
  name = '';
  amount = 0;
  quantity = 0;
  price = 0;
  timeLineName = '';
  isShowAmountInput = true;

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

    this.tdCheckbox = document.createElement("td");

    this.tdAmount = document.createElement("td");

    this.tdTimeLines = document.createElement("td");

    const tdButtons = document.createElement("td");

    this.tr.appendChild(this.tdName);
    this.tr.appendChild(this.tdPrice);
    this.tr.appendChild(this.tdQuantity);
    this.tr.appendChild(this.tdCheckbox);
    this.tr.appendChild(this.tdAmount);
    this.tr.appendChild(this.tdTimeLines);
    this.tr.appendChild(tdButtons);

    this.saveButton = document.createElement("button");
    this.saveButton.className = "custom-btn";
    this.saveButton.innerHTML = `<i class="bi bi-check2"></i>`;
    this.saveButton.onclick = this.saveButtonClick.bind(this);

    this.editButton = document.createElement("button");
    this.editButton.className = "custom-btn";
    this.editButton.innerHTML = `<i class="bi bi-highlighter"></i>`;
    this.editButton.onclick = this.editButtonClick.bind(this);

    this.deleteButton = document.createElement("button");
    this.deleteButton.className = "custom-btn";
    this.deleteButton.innerHTML = `<i class="bi bi-trash"></i>`;
    this.deleteButton.onclick = this.deleteButtonClick.bind(this);

    this.setInputsState(true);

    tdButtons.appendChild(this.saveButton);
    tdButtons.appendChild(this.editButton);
    tdButtons.appendChild(this.deleteButton);
    this.tbody.appendChild(this.tr);
  }


  saveButtonClick() {
    // if (this.inputName.value.trim()
    //   && ((!this.inputAmountCheckbox.checked && this.inputPrice.value.trim() && this.inputQuantity.value.trim()) 
    //     || (this.inputAmountCheckbox.checked && this.inputAmount.value.trim()))) {

    if (this.inputName.value.trim() === "") {
      this.setError(this.inputName, this.tdName);
    }

    if (!this.inputAmountCheckbox.checked && (this.inputPrice.value.trim() === "" || +this.inputPrice.value < 0)) {
      this.setError(this.inputPrice, this.tdPrice);
      return;
    }

    if (!this.inputAmountCheckbox.checked && this.inputQuantity.value.trim() === "") {
      this.setError(this.inputQuantity, this.tdQuantity);
      return;
    }

    if (this.inputAmountCheckbox.checked && this.inputAmount.value.trim() === "") {
      this.setError(this.inputAmount, this.tdAmount);
      return;
    }


      this.name = this.inputName.value;
      this.isShowAmountInput = this.inputAmountCheckbox.checked;
      this.timeLineName = this.timeLineSelect.value;

      if (this.inputAmountCheckbox.checked) {
        this.amount = +this.inputAmount.value;
      } else {
        this.price = +this.inputPrice.value;
        this.quantity = +this.inputQuantity.value;
        this.amount = this.price * this.quantity;
      }

      this.setInputsState(false);
      this.table.saveData();
  }

  setError(input, td) {
    input.className = "form-control is-invalid";
    input.required = true;
  }

  removeError(input, td) {
    if (td.children[0].children.length > 0) {
      td.innerHTML = '';
      td.appendChild(input);
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
      this.tdTimeLines.innerHTML = '';

      this.inputName = document.createElement("input");
      this.inputName.className = "form-control";
      this.inputName.type = "text";
      this.inputName.placeholder = "Enter name";
      this.inputName.value = this.name;
      this.tdName.appendChild(this.inputName);

      this.inputName.addEventListener("keydown", function (event) {
        event.currentTarget.className = "form-control";
      });

      this.timeLineSelect = this.getTimeLineComboBox();
      this.tdTimeLines.appendChild(this.timeLineSelect);

      this.inputName.style.minWidth = "100px";
      this.timeLineSelect.style.width = "180px";
      this.timeLineSelect.style.textAlign = "center";

      this.timeLineSelect.style.width = '200px';
      this.timeLineSelect.style.padding = '8px';
      this.timeLineSelect.style.borderRadius = '6px';
      this.timeLineSelect.style.border = '1px solid #ccc';
      this.timeLineSelect.style.backgroundColor = '#fff';
      this.timeLineSelect.style.cursor = 'pointer';

      this.showInputs(this.isShowAmountInput);

      this.inputAmountCheckboxDiv = document.createElement("div");
      this.inputAmountCheckboxDiv.className = "form-check form-switch";

      this.inputAmountCheckbox = document.createElement("input");
      this.inputAmountCheckbox.type = "checkbox";
      this.inputAmountCheckbox.className = "form-check-input";
      this.inputAmountCheckbox.checked = this.isShowAmountInput;
      this.inputAmountCheckboxDiv.appendChild(this.inputAmountCheckbox);
      this.tdCheckbox.appendChild(this.inputAmountCheckboxDiv);

      this.inputAmountCheckbox.addEventListener("change", () => {
        this.showInputs(this.inputAmountCheckbox.checked);
      });

      this.inputAmount.addEventListener("keydown", function (event) {
        event.currentTarget.className = "form-control";
      });

      this.saveButton.hidden = false;
      this.editButton.hidden = true;
    } else {
      this.tdName.innerHTML = this.name;
      this.tdAmount.innerHTML = this.amount;
      this.tdTimeLines.innerHTML = this.timeLineName;
      this.tdCheckbox.innerHTML = '';

      if (this.isShowAmountInput) {
        this.tdPrice.innerHTML = '--';
        this.tdQuantity.innerHTML = '--';
      } else {
        this.tdPrice.innerHTML = this.price;
        this.tdQuantity.innerHTML = this.quantity;
      }

      this.saveButton.hidden = true;
      this.editButton.hidden = false;
    }
  }

  showInputs(showAmount) {
    if (showAmount) {
      this.tdQuantity.innerHTML = '--';
      this.tdPrice.innerHTML = '--';

      this.inputAmount = document.createElement("input");
      this.inputAmount.className = "form-control";
      this.inputAmount.type = "number";
      this.inputAmount.placeholder = "Enter amount";
      this.inputAmount.value = this.amount;
      this.tdAmount.innerHTML = '';
      this.tdAmount.appendChild(this.inputAmount);
    } else {
      this.tdAmount.innerHTML = '--';

      this.inputQuantity = document.createElement("input");
      this.inputQuantity.className = "form-control";
      this.inputQuantity.type = "number";
      this.inputQuantity.placeholder = "Enter number";
      this.inputQuantity.value = this.quantity;
      this.inputQuantity.min = 0;
      this.tdQuantity.innerHTML = '';
      this.tdQuantity.appendChild(this.inputQuantity);

      this.inputQuantity.addEventListener("keydown", function (event) {
        event.currentTarget.className = "form-control";
      });

      this.inputPrice = document.createElement("input");
      this.inputPrice.className = "form-control";
      this.inputPrice.type = "number";
      this.inputPrice.placeholder = "Enter number";
      this.inputPrice.value = this.price;
      this.inputPrice.min = 0;
      this.tdPrice.innerHTML = '';
      this.tdPrice.appendChild(this.inputPrice);

      this.inputPrice.addEventListener("keydown", function (event) {
        event.currentTarget.className = "form-control";
      });
    }
  }

  getTimeLineComboBox() {
    let select = document.createElement('select');
    select.classList.add('timeline-select');

    let defaultOption = document.createElement('option');
    defaultOption.value = 'None';
    defaultOption.innerText = 'None';
    defaultOption.style.fontWeight = 'bold';
    select.appendChild(defaultOption);

    let store = localStorage.getItem('table');
    if (store) {
      let data = JSON.parse(store);
      data.forEach(item => {
        let option = document.createElement('option');
        option.value = item.name;
        option.innerText = item.name;
        option.style.padding = '5px';

        if (item.name === this.timeLineName) {
          option.selected = true;
        }

        select.appendChild(option);
      });
    }

    return select;
  }

}


