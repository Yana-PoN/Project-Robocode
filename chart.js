const canvasWrapper = document.getElementById("canvas-wrapper");
const canvas = document.createElement("canvas");
canvas.id = "pie";

function removeCanvas() {
    canvasWrapper.remove(canvas);
}

const data = {
  labels: ['TimeLine', 'TimeLine2', 'Yellow', 'Green', 'Blue'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [500, 468, 3, 4, 5],
      backgroundColor: ["red", "green", "blue", "black", "grey"],
    }
  ]
};

const config = {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Pie'
        }
      }
    },
};

function addCanvas() {
    canvasWrapper.append(canvas);
    const pie = document.getElementById("pie");
    new Chart(pie, config);
}
