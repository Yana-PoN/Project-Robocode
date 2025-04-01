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
    const div = document.createElement("div");
    div.className = "canvas-size";
    const canvas = document.createElement("canvas");
    canvas.id = id;
    div.appendChild(canvas)
    canvasWrapper.append(div);
    const pie = document.getElementById(id);

    const data = {
            labels: labels,
            datasets: [
            {
                label: 'Всього',
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

function createDiagram(id, labels, amountsA, amountsB, title) {
    const div = document.getElementById("divDiagram");
    const canvas = document.createElement("canvas");
    canvas.id = id;
    div.appendChild(canvas);

    const pie = document.getElementById(id);

    const data = {
            labels: labels,
            datasets: [
            {
              label: "Баланс план А",
              data: amountsA,
              backgroundColor: labels.map(getRandomColor),
              fill: false
          },
          {
              label: "Баланс план Б",
              data: amountsB,
              backgroundColor: labels.map(getRandomColor),
              fill: false
          }
            ]
        };

    const config = {
        type: 'line',
        data: data,
        options: {
          maintainAspectRatio: false,
          plugins: {
            filler: {
              propagate: true,
            },
            title: {
              display: true,
              text: title
            }
          },
          interaction: {
            intersect: true,
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