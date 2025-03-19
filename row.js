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
    
    this.tdTimeLines = document.createElement("td");

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
    if (this.inputName.value && this.inputPrice.value && this.inputQuantity.value) {
      this.name = this.inputName.value;
      this.price = +this.inputPrice.value;
      this.quantity = +this.inputQuantity.value;
      this.amount = this.price * this.quantity;

      this.setInputsState(false);
      this.table.saveData();
    } else {
      alert("Please fill in all fields");
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

      if (!this.tdTimeLines) {
        this.tdTimeLines = document.createElement("td");
    } else {
        this.tdTimeLines.innerHTML = '';
    }

    // this.buttonTimeLines = document.createElement("button");
    // this.buttonTimeLines.className = "btn btn-outline-primary";
    this.buttonTimeLines = document.createElement("button");
    this.buttonTimeLines.className = "btn btn-outline-primary dropdown-toggle"; // Кнопка с выпадающим меню
    this.buttonTimeLines.setAttribute("type", "button");
    this.buttonTimeLines.setAttribute("id", "dropdownMenuButton");
    this.buttonTimeLines.setAttribute("data-bs-toggle", "dropdown");
    this.buttonTimeLines.setAttribute("aria-expanded", "false");
    this.buttonTimeLines.innerText = "Dropdown button";
    
    // Создаем выпадающее меню с белым фоном
    const dropdownMenu = document.createElement("ul");
    dropdownMenu.className = "dropdown-menu dropdown-menu-light fade"; // Сменили на light
    dropdownMenu.setAttribute("aria-labelledby", "dropdownMenuButton");
    
    // Элементы выпадающего меню
    const actionItem = document.createElement("li");
    const actionLink = document.createElement("a");
    actionLink.className = "dropdown-item";
    actionLink.href = "#";
    actionLink.innerText = "Action";
    actionItem.appendChild(actionLink);
    
    const anotherItem = document.createElement("li");
    const anotherLink = document.createElement("a");
    anotherLink.className = "dropdown-item";
    anotherLink.href = "#";
    anotherLink.innerText = "Another action";
    anotherItem.appendChild(anotherLink);
    
    const elseItem = document.createElement("li");
    const elseLink = document.createElement("a");
    elseLink.className = "dropdown-item";
    elseLink.href = "#";
    elseLink.innerText = "Something else here";
    elseItem.appendChild(elseLink);
    
    // Добавляем элементы в выпадающее меню
    dropdownMenu.appendChild(actionItem);
    dropdownMenu.appendChild(anotherItem);
    dropdownMenu.appendChild(elseItem);
    
    // Добавляем кнопку и меню в нужный контейнер (например, td)
    this.tdTimeLines.appendChild(this.buttonTimeLines);
    this.tdTimeLines.appendChild(dropdownMenu);
    

    this.tdTimeLines.appendChild(this.buttonTimeLines);

    // Вставляем ячейку перед кнопками
    this.tr.insertBefore(this.tdTimeLines, this.tr.lastChild);


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

      this.saveButton.hidden = true;
      this.editButton.hidden = false;
    }
  }
}


