class Row {

  status = 'Active';
  name = '';
  amount = 0;
  quantity = 0;
  price = 0;
  timeLineName = '';

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
    
    this.tdTimeLines = document.createElement("td");

    const tdButtons = document.createElement("td");

    this.tr.appendChild(this.tdName);
    this.tr.appendChild(this.tdPrice);
    this.tr.appendChild(this.tdQuantity);
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

  tablesMargin() {
    const addInc = document.getElementById("addInc");
    addInc.style.marginLeft = "0px";
    const deleteInc = document.getElementById("deleteInc");
    deleteInc.style.marginRight = "0px";

    const addCons = document.getElementById("addCons");
    addCons.style.marginLeft = "0px";
    const deleteCons = document.getElementById("deleteCons");
    deleteCons.style.marginRight = "0px";

    const addIncB = document.getElementById("addIncB");
    addIncB.style.marginLeft = "0px";
    const deleteIncB = document.getElementById("deleteIncB");
    deleteIncB.style.marginRight = "0px";

    const addConsB = document.getElementById("addConsB");
    addConsB.style.marginLeft = "0px";
    const deleteConsB = document.getElementById("deleteConsB");
    deleteConsB.style.marginRight = "0px";
  }

  saveButtonClick() {
    if (this.inputName.value.trim() && this.inputPrice.value && this.inputQuantity.value) {

      this.tablesMargin();
      
      this.name = this.inputName.value;
      this.price = +this.inputPrice.value;
      this.quantity = +this.inputQuantity.value;
      this.amount = this.price * this.quantity;
      this.timeLineName = this.timeLineSelect.value;

      this.setInputsState(false);
      this.table.saveData();

    } else {

      if (this.inputName.value.trim() === "") {
        this.setError(this.inputName, this.tdName);
      } 
    
      if (this.inputPrice.value === "") {
        this.setError(this.inputPrice, this.tdPrice);
      } 
    
      if (this.inputQuantity.value === "") {
        this.setError(this.inputQuantity, this.tdQuantity);
      } 
  }
}

  setError(input, td) {
    input.className = "form-control is-invalid";
    input.required = true;
  }

  removeError(input, td) {
    if (td.children[0].children.length > 0){
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

    this.tablesMargin();

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

      this.inputName.addEventListener("keydown", function(event) {
        event.currentTarget.className = "form-control";
      });

      this.inputQuantity = document.createElement("input");
      this.inputQuantity.className = "form-control";
      this.inputQuantity.type = "number";
      this.inputQuantity.placeholder = "Enter number";
      this.inputQuantity.value = this.quantity;
      this.inputQuantity.min = 0;
      this.tdQuantity.appendChild(this.inputQuantity);

      this.inputPrice = document.createElement("input");
      this.inputPrice.className = "form-control";
      this.inputPrice.type = "number";
      this.inputPrice.placeholder = "Enter number";
      this.inputPrice.value = this.price;
      this.inputPrice.min = 0;
      this.tdPrice.appendChild(this.inputPrice);

      this.timeLineSelect = this.getTimeLineComboBox();
      this.tdTimeLines.appendChild(this.timeLineSelect);

      this.inputName.style.width = "100px";
      this.inputPrice.style.width = "100px";
      this.inputQuantity.style.width = "100px";
      this.timeLineSelect.style.width = "180px";
      this.timeLineSelect.style.textAlign = "center";

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
      this.tdTimeLines.innerHTML = this.timeLineName;

      this.saveButton.hidden = true;
      this.editButton.hidden = false;
    }
  }

  // getTimeLineComboBox() {
  //   let select = document.createElement('select');
  //   let option = document.createElement('option');
  //   option.value = 'None';
  //   option.innerText = 'None';
  //   option.style.width = "180px";
  //   select.appendChild(option);

  //   let store = localStorage.getItem('table');
  //   if (store) {
  //     let data = JSON.parse(store);
  //     for (let item of data) {
  //       option = document.createElement('option');
  //       option.value = item.name;
  //       option.innerText = item.name;

  //       if (item.name === this.timeLineName) {
  //         option.selected = true;
  //       }

  //       select.appendChild(option);
  //     }
  //   }
  //   return select;
  // }
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

    
    select.style.width = '200px';
    select.style.padding = '8px';
    select.style.borderRadius = '6px';
    select.style.border = '1px solid #ccc';
    select.style.backgroundColor = '#fff';
    select.style.cursor = 'pointer';

    return select;
}

}


