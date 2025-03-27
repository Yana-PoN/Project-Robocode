class Table {

  tbody;
  rows = [];

  constructor(name, tableBody, removeButton, copyPlanAButton) {
    this.name = name;
    this.tbody = tableBody;
    this.removeButton = removeButton;
    this.copyPlanAButton = copyPlanAButton;
  }

  add() {
    let row = new Row(this.tbody, this);
    this.rows.push(row);

    const checkIncome = document.getElementById("flexSwitchCheckIncome");
    if (checkIncome) {
      checkIncome.checked = true;
    }

    const checkConsumption = document.getElementById("flexSwitchCheckConsumption");
    if (checkConsumption) {
      checkConsumption.checked = true;
    }

    const checkIncomeB = document.getElementById("flexSwitchCheckIncomeB");
    if (checkIncomeB) {
      checkIncomeB.checked = true;
    }

    const checkConsumptionB = document.getElementById("flexSwitchCheckConsumptionB");
    if (checkConsumptionB) {
      checkConsumptionB.checked = true;
    }
  }

  saveData() {
    let data = this.getData();
    localStorage.setItem(this.name, JSON.stringify(data));

    this.removeButton.disabled = data.length === 0;
  }

  fillData(data) {
    if (!data) {
      let store = localStorage.getItem(this.name);
      console.log(store);
      if (store) {
        data = JSON.parse(store);
      } else {
        return;
      }
    }

    for (let item of data) {
      let row = new Row(this.tbody, this);
      row.name = item.name;
      row.price = item.price;
      row.quantity = item.quantity;
      row.amount = item.amount;
      row.isShowAmountInput = item.isAmount;
      row.timeLineName = item.timeline;
      row.setInputsState(false);
      this.rows.push(row);
    }

    this.removeButton.disabled = data.length === 0;
     
  }

  getData() {
    let result = [];
    // this.rows.map();
    for (let row of this.rows) {
      if (row.status === "Active") {
        result.push(
          {
            name: row.name,
            isAmount: row.isShowAmountInput,
            price: row.price,
            quantity: row.quantity,
            amount: row.amount,
            timeline: row.timeLineName
          });
      }
    }

    return result;
  }

  remove() {
    localStorage.setItem(this.name);
  }
}