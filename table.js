class Table {
    
    tbody;
    rows = [];

    constructor(name, tableBody) {
      this.name = name;
      this.tbody = tableBody;
    }

    add() {
      let row = new Row(this.tbody, this);
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
          let row = new Row(this.tbody, this);
          row.name = item.name;
          row.price = item.price;
          row.quantity = item.quantity;
          row.amount = item.amount ;
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
          result.push({name: row.name, price: row.price, quantity: row.quantity, amount: row.amount});
        }
      }

      return result;
    }

    remove() {
      localStorage.setItem(this.name);
    }
}