function createChart(labels, datasets, options, chartid, type) {
  const data = {
    labels: labels,
    datasets: datasets,
  };
  const config = {
    type: type,
    data: data,
    options: options,
  };

  const ctx = document.getElementById(chartid);
  const myChart = new Chart(ctx, config);
  return myChart;
}
// transaction_by_each_day chart:

const transaction_by_each_day = createChart(
  ["Monday", "Tuesday", "Wedsday", "Thursday", "Friday", "Saturday", "Sunday"],  // array x:
  [
    {
      label: "My First Dataset",  // 3 label buat bar chartnya: // ini juga sebagai legend:
      data: [6510, 59, 80, 81, 56, 55, 40], // array index sesuai dengan jumlah data di labels:
      backgroundColor: [
        "red",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
    },
    {
      label: "My First Dataset",
      data: [6510, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        "purple",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
    },
    {
      label: "My First Dataset",
      data: [6510, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        "blue",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
    }
  ],
  {},
  "transaction-by-day-Chart",
  "bar"

);

// transaction_by_hour_chart:
const transaction_by_hour_chart = createChart(
  ["10", "15", "20",],
  [
    {
      label: "My First Dataset",
      data: [651, 59, 80,],
      backgroundColor: [
        "red",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",

      ],
    },
    {
      label: "My First Dataset",
      data: [651, 59, 80,],
      backgroundColor: [
        "red",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
      ],
    },
    {
      label: "My First Dataset",
      data: [651, 59, 80,],
      backgroundColor: [
        "red",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
      ],
    }
  ],
  {},
  "transaction-by-hour-chart",  //sesuai di canvas html:
  "line"

);


// buat chart stack bar sama tapi yang diganti dioption: