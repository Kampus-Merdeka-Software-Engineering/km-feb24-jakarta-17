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
  ["Monday", "Tuesday", "Wedsday", "Thursday", "Friday", "Saturday", "Sunday"], // array x:
  [
    {
      label: "Lower Manhattan", // 3 label buat bar chartnya: // ini juga sebagai legend:
      data: [7403000, 7032000, 7370000, 7427000, 7325000, 6942000, 7073000], // array index sesuai dengan jumlah data di labels:
      backgroundColor: [
        "darkgrey",
        "darkgrey",
        "darkgrey",
        "darkgrey",
        "darkgrey",
        "darkgrey",
        "darkgrey",
      ],
    },
    {
      label: "Astoria",
      data: [7104000, 7472000, 7173000, 7307000, 7489000, 6846000, 7344000],
      backgroundColor: ["grey", "grey", "grey", "grey", "grey", "grey", "grey"],
    },
    {
      label: "Hell's Kitchen",
      data: [7136000, 6696000, 6767000, 6920000, 6860000, 6722000, 6679000],
      backgroundColor: [
        "black",
        "black",
        "black",
        "black",
        "black",
        "black",
        "black",
      ],
    },
  ],
  {},
  "transaction-by-day-Chart",
  "bar"
);

// transaction_by_hour_chart:
const transaction_by_hour_chart = createChart(
  ["10", "15", "20"],
  [
    {
      label: "Lower Manhattan",
      data: [651, 59, 80],
      backgroundColor: ["#63c5da", "#63c5da", "#63c5da"],
    },
    {
      label: "Astoria",
      data: [651, 59, 80],
      backgroundColor: ["#0492c2", "#0492c2", "#0492c2"],
    },
    {
      label: "Hell's Kitchen",
      data: [651, 59, 80],
      backgroundColor: ["#2832c2", "#2832c2", "#2832c2"],
    },
  ],
  {},
  "transaction-by-hour-chart", //sesuai di canvas html:
  "line"
);

// transaction_by_month_chart:
const transaction_by_month_chart = createChart(
  ["January", "February", "March", "April", "May", "June"],
  [
    {
      label: "Lower Manhattan",
      data: [651, 590, 800, 810, 560, 550],
      backgroundColor: [
        "#63c5da",
        "#63c5da",
        "#63c5da",
        "#63c5da",
        "#63c5da",
        "#63c5da",
      ],
    },
    {
      label: "Astoria",
      data: [651, 590, 800, 810, 560, 550],
      backgroundColor: [
        "#0492c2",
        "#0492c2",
        "#0492c2",
        "#0492c2",
        "#0492c2",
        "#0492c2",
      ],
    },
    {
      label: "Hell's Kitchen",
      data: [651, 590, 800, 810, 560, 550],
      backgroundColor: [
        "#2832c2",
        "#2832c2",
        "#2832c2",
        "#2832c2",
        "#2832c2",
        "#2832c2",
      ],
    },
  ],
  {},
  "transaction-by-month-chart", //sesuai di canvas html:
  "line"
);

// store_location_revenue_chart:
const store_location_revenue_chart = createChart(
  ["Total Pendapatan"], // array x:
  [
    {
      label: "Lower Manhattan", // 3 label buat bar chartnya: // ini juga sebagai legend:
      data: [651], // array index sesuai dengan jumlah data di labels:
      backgroundColor: ["darkgrey"],
    },
    {
      label: "Astoria",
      data: [651],
      backgroundColor: ["grey"],
    },
    {
      label: "Hell's Kitchen",
      data: [651],
      backgroundColor: ["black"],
    },
  ],
  {},
  "store-location-revenue-chart",
  "bar"
);

// Product-Transaction-by-Store-chart:
const Product_Transaction_by_Store_chart = createChart(
  [
    "Coffee",
    "Bakery",
    "Drinking Chocolate",
    "Tea",
    "Flavours",
    "Coffee Beans",
    "Branded",
    "Loose Tea",
    "Packaged Chocolate",
  ], // array x:
  [
    {
      label: "Lower Manhattan", // 3 label buat bar chartnya: // ini juga sebagai legend:
      data: [651, 200, 300, 100], // array index sesuai dengan jumlah data di labels:
      backgroundColor: [
        "#F1DEC9", ],
    },
    {
      label: "Astoria",
      data: [651, 200, 300, 100],
      backgroundColor: ["#6AC8B6"],
    },
    {
      label: "Hell's Kitchen",
      data: [651, 200, 300, 100],
      backgroundColor: ["#A4907C"],
    },
    {
      label: "Total Penjualan",
      data: [651, 200, 300, 100],
      backgroundColor: ["#8D7B68"],
    },
  ],
  {
    indexAxis: "y",
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  },
  "Product-Transaction-by-Store-chart",
  "bar"
);

// Revenue_by_Weekday/Weekend_chart:
const Revenue_by_Weekday_Weekend_chart = createChart(
  ["Weekday", "Weekend"], // array x:
  [
    {
      label: "Revenue", // 3 label buat bar chartnya: // ini juga sebagai legend:
      data: [1000, 250], // array index sesuai dengan jumlah data di labels:
      backgroundColor: ["blue", "skyblue"],
    },
  ],
  {},
  "Revenue-by-Weekday/Weekend-chart",
  "pie"
);
