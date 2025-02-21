class Table{
    
    tbody;
    rows = [];

    constructor(tableBody) {
      this.tbody = tableBody;
    }

    add() {
      let row = new Row(this.tbody);
      this.rows.push(row);
    }

    getData() {
      let result = [];
      for (let row of this.rows) {
        if (row.status === "Active") {
          result.push(row);
        }
      }

      return result;
    }
}