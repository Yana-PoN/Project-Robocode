
class Calculation {

    incomeValuesA = [];
    consumptionValuesA = [];
    resultValuesA = [];
    balanceValuesA = [];

    incomeValuesB = [];
    consumptionValuesB = [];
    resultValuesB = [];
    balanceValuesB = [];

    constructor(incomeA, consumptionA, incomeB, consumptionB, periodsCount, depositRate, timeLines, theadRow, tbody) {
        this.incomeA = incomeA;
        this.consumptionA = consumptionA;
        this.incomeB = incomeB;
        this.consumptionB = consumptionB;
        this.periodsCount = periodsCount;
        this.depositRate = depositRate;
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
            this.createRow("----------> План A", [], true);
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
            this.createRow("----------> План Б", [], true);
            this.createRow("", []);

            this.fillTableForPlan(
                this.incomeB,
                this.consumptionB,
                this.incomeValuesB,
                this.consumptionValuesB,
                this.resultValuesB,
                this.balanceValuesB);
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

        if (checkIncome.checked && income.length > 0) {
            this.createRow("Дохід", [], true);
            income.forEach(v => {
                let values = this.getValuesByRow(v);
                for (let i = 0; i < values.length; i++) {
                    incomeValues[i] += values[i];
                }
                this.createRow(v.name, values);
            });

            this.createRow('Всього', incomeValues, true);

            const incomeBalance = [];
            for (let i = 0; i < incomeValues.length; i++) {
                let value = this.round(i == 0 ? incomeValues[i] : incomeValues[i] + incomeBalance[i - 1]);
                incomeBalance.push(value);
            }
            this.createRow('Баланс', incomeBalance, true);
        }

        if (checkConsumption.checked && consumption.length > 0) {
            this.createRow("Витрати", [], true);
            consumption.forEach(v => {
                let values = this.getValuesByRow(v);
                for (let i = 0; i < values.length; i++) {
                    consumptionValues[i] += values[i];
                }
                this.createRow(v.name, values);
            });
            this.createRow('Всього', consumptionValues, true);

            const consumptionBalance = [];
            for (let i = 0; i < consumptionValues.length; i++) {
                let value = this.round(i == 0 ? consumptionValues[i] : consumptionValues[i] + consumptionBalance[i - 1]);
                consumptionBalance.push(value);
            }
            this.createRow('Баланс', consumptionBalance, true);
        }

        if (checkIncome.checked && checkConsumption.checked) {
            let balance = 0;
            for (let i = 0; i < this.periodsCount; i++) {
                let result = (incomeValues[i] ?? 0) - (consumptionValues[i] ?? 0);
                balance += result;
                resultValues[i] = result;
                balanceValues.push(this.round(balance));
            }

            this.createRow("----------", [], true);

            this.createRow("Результат", resultValues, true);
            this.createRow("Баланс", balanceValues, true);
        }
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

    createRow(name, values, isGroup) {
        const tr = document.createElement("tr");

        const nameColumn = document.createElement("td");
        nameColumn.innerText = name;
        if (isGroup) {
            nameColumn.className = "calcGroup";
        } else {
            nameColumn.className = "calcItem";
        }

        tr.appendChild(nameColumn);

        for (let i = 1; i <= values.length; i++) {
            const valueColumn = document.createElement("td");
            valueColumn.innerText = values[i - 1];
            tr.appendChild(valueColumn);
        }

        this.tbody.appendChild(tr);
    }

    round(value) {
        return Math.round(value * 100) / 100;
    }
}