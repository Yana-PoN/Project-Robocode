class RowTimeLines {

  status = 'Active';
  name = '';
  numberOfPeriods = 1;
  weights = [1];

  inputWeights = [];

  constructor(tableBody, table) {
    this.tbody = tableBody;
    this.table = table;
    this.createRow();
  }

  createRow() {
    this.tr = document.createElement("tr");

    this.tdName = document.createElement("td");

    this.tdNumberOfPeriods = document.createElement("td");

    this.tdWeight = document.createElement("td");

    const tdButtons = document.createElement("td");


    this.tr.appendChild(this.tdName);
    this.tr.appendChild(this.tdNumberOfPeriods);
    this.tr.appendChild(this.tdWeight);
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
    if (this.inputName.value && this.inputNumberOfPeriods.value) {
      if (this.name !== this.inputName.value && this.table.isExistName(this.inputName.value)) {
        const colDiv = document.createElement("div");
        colDiv.className = "col-md-6";

        this.inputName.className = "form-control is-invalid";
        this.inputName.style.borderRadius = "0px";
        this.inputName.style.width = "180px";
        this.inputName.style.height = "27px";
        this.inputName.style.marginLeft = "39px";
        this.inputName.setAttribute("aria-describedby", "validationServer03Feedback");
        this.inputName.required = true;
        colDiv.appendChild(this.inputName);

        this.tdName.appendChild(colDiv);

        return;
      }

      this.name = this.inputName.value;
      this.numberOfPeriods = +this.inputNumberOfPeriods.value;

      this.weights = [];
      this.inputWeights.forEach((v) => {
        this.weights.push(v.value);
      });


      this.setInputsState(false);
      this.table.saveData();
    } else {
      let alertDiv = document.createElement("div");
      alertDiv.className = "alert alert-warning alert-dismissible fade show";
      alertDiv.role = "alert";
      alertDiv.innerHTML = `<strong>Please</strong> fill in all fields.`;

      let closeButton = document.createElement("button");
      closeButton.type = "button";
      closeButton.className = "btn-close";
      closeButton.setAttribute("data-bs-dismiss", "alert");
      closeButton.setAttribute("aria-label", "Close");

      alertDiv.appendChild(closeButton);

      tbody.appendChild(alertDiv);
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
      this.tdNumberOfPeriods.innerHTML = '';
      this.tdWeight.innerHTML = '';

      this.inputName = document.createElement("input");
      this.inputName.className = "form-control";
      this.inputName.type = "text";
      this.inputName.placeholder = "Enter name";
      this.inputName.value = this.name;
      this.tdName.appendChild(this.inputName);

      this.inputName.addEventListener("keydown", function (event) {
        if (event.key === " ") {
          event.preventDefault();
        }
      });

      this.inputNumberOfPeriods = document.createElement("input");
      this.inputNumberOfPeriods.className = "form-control";
      this.inputNumberOfPeriods.type = "number";
      this.inputNumberOfPeriods.placeholder = "Enter number";
      this.inputNumberOfPeriods.value = this.numberOfPeriods;
      this.inputNumberOfPeriods.min = 1;
      this.tdNumberOfPeriods.appendChild(this.inputNumberOfPeriods);

      this.inputNumberOfPeriods.onchange = () => {
        this.tdWeight.innerHTML = "";
        this.inputWeights = [];

        let count = Number(this.inputNumberOfPeriods.value);
        for (let i = 0; i < count; i++) {
          let inputWeight = document.createElement("input");
          inputWeight.className = "form-control";
          inputWeight.type = "number";
          inputWeight.placeholder = "Enter number";
          inputWeight.min = 0;
          inputWeight.value = this.weights[i] || '';
          this.inputWeights.push(inputWeight);
          this.tdWeight.appendChild(inputWeight);
        }
      };

      let count = this.weights.length;
      this.tdWeight.innerHTML = "";
      this.inputWeights = [];
      for (let i = 0; i < count; i++) {
        let inputWeight = document.createElement("input");
        inputWeight.type = "number";
        inputWeight.placeholder = "Enter number";
        inputWeight.min = 0;
        inputWeight.value = this.weights[i] || '';
        this.inputWeights.push(inputWeight);
        this.tdWeight.appendChild(inputWeight);
      }

      this.saveButton.hidden = false;
      this.editButton.hidden = true;
    } else {
      this.tdName.innerHTML = this.name;
      this.tdNumberOfPeriods.innerHTML = this.numberOfPeriods;
      this.tdWeight.innerHTML = this.weights;

      this.saveButton.hidden = true;
      this.editButton.hidden = false;
    }
  }
}