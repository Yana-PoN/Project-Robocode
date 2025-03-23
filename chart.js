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

function getRandomNumber() {
    return Math.floor(Math.random() * 255);
}

function getRandomColor() {
    const red = getRandomNumber();
    const green = getRandomNumber();
    const blue = getRandomNumber();
    const rgbColor = `rgb(${red}, ${green}, ${blue})`
    return rgbColor;
}

function createPie(id, labels, amounts, title) {
    const canvas = document.createElement("canvas");
    canvas.id = id;
    canvasWrapper.append(canvas);
    const pie = document.getElementById(id);

    const data = {
            labels: labels,
            datasets: [
            {
                label: 'Dataset 1',
                data: amounts,
                backgroundColor: labels.map(getRandomColor),
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
              text: title
            }
          }
        },
    };

    new Chart(pie, config);
    return canvas;
}

function setLabels(labels) {
    data.labels = labels;
}

function setAmount(amounts) {
    data.datasets[0].data = amounts;
}