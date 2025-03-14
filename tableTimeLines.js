class TableTimeLines {
    
    tbody;
    rows = [];

    constructor(name, tableBody) {
      this.name = name;
      this.tbody = tableBody;
    }

    add() {
      let row = new RowTimeLines(this.tbody, this);
      this.rows.push(row);
    }

     saveData() {
        localStorage.setItem(this.name, JSON.stringify(this.getData()));
    }

    fillData() {
        let store = localStorage.getItem(this.name);
        console.log(store);
        if (store) {
        let data = JSON.parse(store);
        for (let item of data) {
          let row = new RowTimeLines(this.tbody, this);
          row.name = item.name;
          row.numberOfPeriods = item.numberOfPeriods;
          row.weights = item.weights;
          row.setInputsState(false); 
          this.rows.push(row);   
      }
    }
  }
  

    getData() {
      let result = [];
      // this.rows.map();
      for (let row of this.rows) {
        if (row.status === "Active") {
          result.push({name: row.name, numberOfPeriods: row.numberOfPeriods, weights: row.weights});
        }
      }

      return result;
    }

    remove() {
      localStorage.setItem(this.name);
    }
}