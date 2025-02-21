
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
        name.innerText = "Name";
        this.theadRow.appendChild(name);

        for(let i = 1; i <= this.periodsCount; i++) {
            const th = document.createElement("th");
            th.innerText = "P" + i;
            this.theadRow.appendChild(th);
        }
        
    }

    createText() {
        this.tr = document.createElement("tr");

        let amount = 0;

        for (let i = 0; i < this.income.length; i++) {
            amount += this.income[i].amount;
        }
        
        
        let amount2 = 0;

        for (let i = 0; i < this.consumption.length; i++) {
            amount2 += this.consumption[i].amount;
        }

        const incomeValues = [];
        const consumptionValues = [];
        const resultValues = [];
        const balanceValues = [];
        for(let i = 1; i <= this.periodsCount; i++){
            incomeValues.push(amount);
            consumptionValues.push(amount2);
            resultValues.push(amount - amount2);
            balanceValues.push((amount - amount2) * i);
            
        }
        

        this.createRow("Income", incomeValues);
        this.createRow("Consumption", consumptionValues);
        this.createRow("Result", resultValues);
        this.createRow("Balance", balanceValues);
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

    // amountCalculation() {
    //     const rows = document.querySelectorAll("#myTable tbody tr");
        
    //     let amount = 0;
    
    //     for (let i = 0; i < rows.length; i++) {
    //         const row = rows[i];
    //         //amount из четвертого столба
    //         const amount4 = row.cells[3];
            
    //         if (amount4) {
    //             const amountText = amount4.innerText;
                
    //             const AmountParseFloat = parseFloat(amountText);
                
    //             if (AmountParseFloat >= 0) {
    //                 amount += AmountParseFloat;
    //             } else {
    //                 alert("Бомж");
    //                 return;
    //             }
    //         }
        
    //         return amount;
    //     }
    // }

    // consumptionCalculation() {
    //     const rows5 = document.querySelectorAll("#myTable5 tbody tr");

    //     let amount6 = 0;
        
    //         for (let i = 0; i < rows5.length; i++) {
    //             const row5 = rows5[i];
    //             const amount5 = row5.cells[3];  
        
    //             if (amount5) {
    //                 const amountText = amount5.innerText; 
    //                 const AmountParseFloat = parseFloat(amountText); 
        
    //                 if (AmountParseFloat >= 0) {
    //                     amount6 += AmountParseFloat;  
    //                 } else {
    //                     alert("Pon");
    //                     return;  
    //                 }
    //             }
    //             return amount6;
    //         }
    // }
}