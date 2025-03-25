
class Calculation {

  PlanType = "calcPlan";
  GroupType = "calcGroup";
  ResultType = "calcResult";
  ItemType = "calcItem";
  PlanResult = "calcResult calcPlanResult";

  incomeValuesA = [];
  consumptionValuesA = [];
  resultValuesA = [];
  balanceValuesA = [];

  incomeValuesB = [];
  consumptionValuesB = [];
  resultValuesB = [];
  balanceValuesB = [];

  isSimpleReport = false;
  isBlockCreateRow = false;

  constructor(incomeA, consumptionA, incomeB, consumptionB, periodsCount, isSimpleReport, timeLines, theadRow, tbody) {
    this.incomeA = incomeA;
    this.consumptionA = consumptionA;
    this.incomeB = incomeB;
    this.consumptionB = consumptionB;
    this.periodsCount = periodsCount;
    this.isSimpleReport = isSimpleReport;
    this.timeLines = timeLines;
    this.theadRow = theadRow;
    this.tbody = tbody;
  }

  drawTable() {
    this.createHeader();
    this.createText();
  }

  createHeader() {
    const name = document.createElement("th");
    name.innerText = "Назва";
    this.theadRow.appendChild(name);

    for (let i = 1; i <= this.periodsCount; i++) {
      const th = document.createElement("th");
      th.innerText = "P" + i;
      this.theadRow.appendChild(th);
    }

  }

  createText() {
    this.tr = document.createElement("tr");

    let amountIncome = 0;

    for (let i = 0; i < this.incomeA.length; i++) {
      amountIncome += this.incomeA[i].amount;
    }

    let amountConsumption = 0;

    for (let i = 0; i < this.consumptionA.length; i++) {
      amountConsumption += this.consumptionA[i].amount;
    }


    const checkComparison = document.getElementById("flexCheckComparison");

    if (checkComparison.checked) {
      this.createRow("План A", [], this.PlanType);
      this.createRow("", []);
    }

    this.fillTableForPlan(
      this.incomeA,
      this.consumptionA,
      this.incomeValuesA,
      this.consumptionValuesA,
      this.resultValuesA,
      this.balanceValuesA);

    if (checkComparison.checked) {
      this.createRow("", []);
      this.createRow("План Б", [], this.PlanType);
      this.createRow("", []);

      this.fillTableForPlan(
        this.incomeB,
        this.consumptionB,
        this.incomeValuesB,
        this.consumptionValuesB,
        this.resultValuesB,
        this.balanceValuesB);

      this.createRow("", []);
      this.createRow("Порівняння:", [], this.PlanType);
      this.createRow("", []);
      this.createComparisonRows("Результат", this.resultValuesA, this.resultValuesB);
      this.createRow("", []);
      this.createComparisonRows("Баланс", this.balanceValuesA, this.balanceValuesB);
    }
  }

  fillTableForPlan(
    income,
    consumption,
    incomeValues,
    consumptionValues,
    resultValues,
    balanceValues) {
    for (let i = 1; i <= this.periodsCount; i++) {
      incomeValues.push(0);
      consumptionValues.push(0);
      resultValues.push(0);
    }

    const checkIncome = document.getElementById("flexCheckIncome");
    const checkConsumption = document.getElementById("flexCheckConsumption");

    if (this.isSimpleReport) {
      this.isBlockCreateRow = true;
    }

    if (checkIncome.checked && income.length > 0) {
      this.createRow("Дохід", [], this.GroupType);
      income.forEach(v => {
        let values = this.getValuesByRow(v);
        for (let i = 0; i < values.length; i++) {
          incomeValues[i] += values[i];
        }
        this.createRow(v.name, values);
      });

      this.createRow('Всього', incomeValues, this.ResultType);

      const incomeBalance = [];
      for (let i = 0; i < incomeValues.length; i++) {
        let value = this.round(i == 0 ? incomeValues[i] : incomeValues[i] + incomeBalance[i - 1]);
        incomeBalance.push(value);
      }
      this.createRow('Баланс', incomeBalance, this.ResultType);
    }

    if (checkConsumption.checked && consumption.length > 0) {
      this.createRow("Витрати", [], this.GroupType);
      consumption.forEach(v => {
        let values = this.getValuesByRow(v);
        for (let i = 0; i < values.length; i++) {
          consumptionValues[i] += values[i];
        }
        this.createRow(v.name, values);
      });
      this.createRow('Всього', consumptionValues, this.ResultType);

      const consumptionBalance = [];
      for (let i = 0; i < consumptionValues.length; i++) {
        let value = this.round(i == 0 ? consumptionValues[i] : consumptionValues[i] + consumptionBalance[i - 1]);
        consumptionBalance.push(value);
      }
      this.createRow('Баланс', consumptionBalance, this.ResultType);
    }

    let balance = 0;

    const useDeposit = document.getElementById("flexCheckQuantity").checked;
    const depositPercent = document.getElementById("exampleInputEmail1").value;
    const deposit = [0];

    for (let i = 0; i < this.periodsCount; i++) {
      let result = (incomeValues[i] ?? 0) - (consumptionValues[i] ?? 0);

      if (useDeposit && i > 0) {
        const depositValue = balanceValues[i - 1] > 0 ? this.round(balanceValues[i - 1] * (+depositPercent / 100)) : 0;
        deposit.push(depositValue);
        incomeValues[i] = this.round(incomeValues[i] + depositValue)
        result = this.round(result + depositValue);
      }

      balance += result;
      resultValues[i] = result;
      balanceValues.push(this.round(balance));
    }

    this.createRow("----------", [], this.GroupType);

    if (useDeposit) {
      this.createRow("Депозит", deposit, this.ResultType);
      this.createRow("Дохід депозиту", this.getBalance(deposit), this.ResultType);
    }

    this.isBlockCreateRow = false;

    if (this.isSimpleReport) {
      if (checkIncome.checked && income.length > 0) {
        this.createRow("Дохід", incomeValues, this.GroupType);
      }

      if (checkConsumption.checked && consumptionValues.length > 0) {
        this.createRow("Витрати", consumptionValues, this.GroupType);
      }
    }

    this.createRow("Результат", resultValues, this.PlanResult);
    this.createRow("Баланс", balanceValues, this.PlanResult);
  }

  getValuesByRow(row) {
    let values = [];
    if (row.timeline !== 'None') {
      const timeLineWages = this.getTimeLinePercentages(row.timeline);
      for (let i = 0; i < this.periodsCount; i++) {
        const value = this.round(row.amount * timeLineWages[i % timeLineWages.length]);
        values.push(value);
      }
    } else {
      for (let i = 0; i < this.periodsCount; i++) {
        values.push(row.amount);
      }
    }

    return values;
  }

  getTimeLinePercentages(timeLineName) {
    for (let i = 0; i < this.timeLines.length; i++) {
      if (this.timeLines[i].name === timeLineName) {
        let weights = this.timeLines[i].weights;
        let timeLinePercentages = [];
        let sumOfWeights = 0;
        weights.forEach(num => sumOfWeights += +num);
        weights.forEach(num => timeLinePercentages.push(+num / sumOfWeights));
        return timeLinePercentages;
      }
    }

    return undefined;
  }

  getBalance(values) {
    const balance = [];
    for (let i = 0; i < values.length; i++) {
      balance.push(i === 0 ? values[i] : this.round(values[i] + balance[i - 1]));
    }

    return balance;
  }

  createRow(name, values, className) {

    if (this.isBlockCreateRow) return;

    const tr = document.createElement("tr");

    if (!className) {
      className = this.ItemType;
    }

    const nameColumn = document.createElement("td");
    nameColumn.innerText = name;
    nameColumn.className = className;

    tr.appendChild(nameColumn);

    for (let i = 1; i <= values.length; i++) {
      const valueColumn = document.createElement("td");
      valueColumn.innerText = values[i - 1];
      tr.appendChild(valueColumn);
    }

    this.tbody.appendChild(tr);
  }

  createComparisonRows(name, valuesA, valuesB) {

    if (this.isBlockCreateRow) return;

    const trA = document.createElement("tr");
    const trB = document.createElement("tr");

    let nameColumn = document.createElement("td");
    nameColumn.innerText = name + ' План А';
    nameColumn.className = this.PlanResult;

    trA.appendChild(nameColumn);

    nameColumn = document.createElement("td");
    nameColumn.innerText = name + ' План Б';
    nameColumn.className = this.PlanResult;

    trB.appendChild(nameColumn);

    for (let i = 0; i < valuesA.length; i++) {
      const valueColumnA = document.createElement("td");
      const valueColumnB = document.createElement("td");

      valueColumnA.innerText = valuesA[i];
      valueColumnA.className = valuesA[i] > valuesB[i] ? 'calcValueGood' : 'calcValueBad';

      valueColumnB.innerText = valuesB[i];
      valueColumnB.className = valuesA[i] < valuesB[i] ? 'calcValueGood' : 'calcValueBad';

      trA.appendChild(valueColumnA);
      trB.appendChild(valueColumnB);
    }

    this.tbody.appendChild(trA);
    this.tbody.appendChild(trB);
  }

  round(value) {
    return Math.round(value * 100) / 100;
  }
}