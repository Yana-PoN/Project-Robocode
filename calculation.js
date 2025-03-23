
class Calculation {
    constructor(income, consumption, periodsCount, theadRow, tbody) {
        this.income = income;
        this.consumption = consumption;
        this.periodsCount = periodsCount;
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

        for(let i = 1; i <= this.periodsCount; i++) {
            const th = document.createElement("th");
            th.innerText = "P" + i;
            this.theadRow.appendChild(th);
        }
        
    }

    createText() {
        this.tr = document.createElement("tr");

        let amountIncome = 0;

        for (let i = 0; i < this.income.length; i++) {
            amountIncome += this.income[i].amount;
        }
        
        
        let amountConsumption = 0;

        for (let i = 0; i < this.consumption.length; i++) {
            amountConsumption += this.consumption[i].amount;
        }

        const incomeValues = [];
        const consumptionValues = [];
        const resultValues = [];
        const balanceValues = [];

        for(let i = 1; i <= this.periodsCount; i++){
            incomeValues.push(amountIncome);
            consumptionValues.push(amountConsumption);
            resultValues.push(amountIncome - amountConsumption);
            balanceValues.push((amountIncome - amountConsumption) * i);
            
        }
        

        this.createRow("Дохід", incomeValues);
        this.createRow("Споживання", consumptionValues);

        const checkComparison = document.getElementById("flexCheckComparison");

        if (checkComparison.checked) {
            this.createRow("Результат", resultValues);
            this.createRow("Баланс", balanceValues);
        } 
    }

    createRow(name, values) {
        const tr = document.createElement("tr");

        const nameColumn = document.createElement("td");
        nameColumn.innerText = name;

        tr.appendChild(nameColumn);

        for(let i = 1; i <= values.length; i++) {   
            const valueColumn = document.createElement("td");
            valueColumn.innerText = values[i-1];
            tr.appendChild(valueColumn);
        }

        this.tbody.appendChild(tr);
    }
}