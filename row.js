class Row {

  state = 'Active';
  name = '';
  amount = 0;

  constructor(tableBody) {
    this.tbody = tableBody;
    this.createRow();
  }

  createRow() {
    this.tr = document.createElement("tr");

    this.tdName = document.createElement("td");

    this.tdAmount = document.createElement("td");

    const tdButtons = document.createElement("td");

    this.tr.appendChild(this.tdName);
    this.tr.appendChild(this.tdAmount);
    this.tr.appendChild(tdButtons);

    // Create Buttons

    this.saveButton = document.createElement("button");
    this.saveButton.textContent = "Save";
    this.saveButton.onclick = this.saveButtonClick.bind(this);

    this.editButton = document.createElement("button");
    this.editButton.textContent = "Edit";
    this.editButton.onclick = this.editButtonClick.bind(this);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = this.deleteButtonClick.bind(this)

    this.setInputsState(true);

    tdButtons.appendChild(this.saveButton);
    tdButtons.appendChild(this.editButton);
    tdButtons.appendChild(deleteButton);
    this.tbody.appendChild(this.tr);
  }

  saveButtonClick() {
    if (this.inputName.value && this.inputAmount.value) {
      this.name = this.inputName.value;
      this.amount = this.inputAmount.value;
      this.setInputsState(false);
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
    this.state = 'Deleted';
    // const check = document.getElementById("check");
    // check.style.visibility = "hidden";
  }

  setInputsState(isVisible) {
    if (isVisible) {
      this.tdName.innerHTML = '';
      this.tdAmount.innerHTML = '';

      this.inputName = document.createElement("input");
      this.inputName.type = "text";
      this.inputName.placeholder = "Enter name";
      this.inputName.value = this.name;
      this.tdName.appendChild(this.inputName);

      this.inputAmount = document.createElement("input");
      this.inputAmount.type = "number";
      this.inputAmount.placeholder = "Enter amount";
      this.inputAmount.value = this.amount;
      this.tdAmount.appendChild(this.inputAmount);

      this.saveButton.hidden = false;
      this.editButton.hidden = true;
    } else {
      this.tdName.innerHTML = this.name;
      this.tdAmount.innerHTML = this.amount;

      this.saveButton.hidden = true;
      this.editButton.hidden = false;
    }
  }
}