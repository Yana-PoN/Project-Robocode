document.addEventListener("DOMContentLoaded", function () {
    const generateLabels = () => {
        return ["January", "February", "March", "April", "May", "Juny", "July", "August", "September", "October", "November", "December"];
    };

    const generateData = () => {
        return Array.from({ length: 12 }, () => Math.floor(Math.random() * 200 - 100));
    };

    const data = {
        labels: generateLabels(),
        datasets: [
            {
                label: "Dataset",
                data: generateData(),
                borderColor: "red",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
                fill: false
            }
        ]
    };

    const config = {
        type: "line",
        data: data,
        options: {
            plugins: {
                filler: {
                    propagate: false,
                },
                title: {
                    display: true,
                    text: (ctx) => "Fill: " + ctx.chart.data.datasets[0].fill
                }
            },
            interaction: {
                intersect: false,
            },
            elements: {
                line: {
                    tension: 0
                }
            }
        }
    };

    // Создаём график
    const ctx = document.getElementById("chart1").getContext("2d");
    const chart = new Chart(ctx, config);

    let smooth = false;

    const actions = [
        {
            name: "Fill: false (default)",
            handler: () => {
                chart.data.datasets.forEach(dataset => {
                    dataset.fill = false;
                });
                chart.update();
            }
        },
        {
            name: "Fill: origin",
            handler: () => {
                chart.data.datasets.forEach(dataset => {
                    dataset.fill = "origin";
                });
                chart.update();
            }
        },
        {
            name: "Fill: start",
            handler: () => {
                chart.data.datasets.forEach(dataset => {
                    dataset.fill = "start";
                });
                chart.update();
            }
        },
        {
            name: "Fill: end",
            handler: () => {
                chart.data.datasets.forEach(dataset => {
                    dataset.fill = "end";
                });
                chart.update();
            }
        },
        {
            name: "Randomize",
            handler: () => {
                chart.data.datasets.forEach(dataset => {
                    dataset.data = generateData();
                });
                chart.update();
            }
        },
        {
            name: "Smooth",
            handler: () => {
                smooth = !smooth;
                chart.options.elements.line.tension = smooth ? 0.4 : 0;
                chart.update();
            }
        }
    ];
});
