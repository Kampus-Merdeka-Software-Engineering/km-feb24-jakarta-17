import datasets from "../data/dataset-team17.json" assert { type: "json" };

// Initialize variables to store total transactions and revenue
let totaltransactions = 0;
let totalrevenue = 0;

// Initialize arrays to store various transaction data
let transactionbyeachday = [];
let transactionbyhour = [];
let producttransaction = [];
let transactionbymonth = [];

// Loop through each dataset entry
for (let index = 0; index < datasets.length; index++) {
  const dataset = datasets[index];

  // Calculate total revenue and transactions
  totalrevenue += dataset.unit_price * dataset.transaction_qty;
  totaltransactions += dataset.transaction_qty;

  // Update transaction data by hour for each store
  if (
    transactionbyhour.filter((item) => item.id === dataset.store_id).length > 0
  ) {
    transactionbyhour = transactionbyhour.map((item) => {
      if (item.id === dataset.store_id) {
        return {
          ...item,
          hours: {
            ...item.hours,
            [dataset.transaction_time.split(":")[0]]: item.hours[
              dataset.transaction_time.split(":")[0]
            ]
              ? item.hours[dataset.transaction_time.split(":")[0]] + 1
              : 1,
          },
        };
      }
      return item;
    });
  } else {
    transactionbyhour.push({
      id: dataset.store_id,
      name: dataset.store_location,
      hours: {
        [dataset.transaction_time.split(":")[0]]: 1,
      },
    });
  }

  // Update transaction data by day for each store
  let store = transactionbyeachday.filter(
    (item) => item.id === dataset.store_id
  );
  if (store.length > 0) {
    if (store[0].days[new Date(dataset.transaction_date).getDay()]) {
      transactionbyeachday = transactionbyeachday.map((item) => {
        if (item.id === dataset.store_id) {
          return {
            ...item,
            days: {
              ...item.days,
              [new Date(dataset.transaction_date).getDay()]:
                item.days[new Date(dataset.transaction_date).getDay()] +
                dataset.unit_price * dataset.transaction_qty,
            },
          };
        }
        return item;
      });
    } else {
      transactionbyeachday = transactionbyeachday.map((item) => {
        if (item.id === dataset.store_id) {
          return {
            ...item,
            days: {
              ...item.days,
              [new Date(dataset.transaction_date).getDay()]:
                dataset.unit_price * dataset.transaction_qty,
            },
          };
        }
        return item;
      });
    }
  } else {
    transactionbyeachday.push({
      id: dataset.store_id,
      name: dataset.store_location,
      days: {
        [new Date(dataset.transaction_date).getDay()]:
          dataset.unit_price * dataset.transaction_qty,
      },
    });
  }

  // Update product transaction data by category for each store
  if (
    producttransaction.filter((item) => item.id === dataset.store_id).length > 0
  ) {
    producttransaction = producttransaction.map((item) => {
      if (item.id === dataset.store_id) {
        return {
          ...item,
          categories: {
            ...item.categories,
            [dataset.product_category]: item.categories[
              dataset.product_category
            ]
              ? item.categories[dataset.product_category] + 1
              : 1,
          },
        };
      }
      return item;
    });
  } else {
    producttransaction.push({
      id: dataset.store_id,
      name: dataset.store_location,
      categories: {
        [dataset.product_category]: 1,
      },
    });
  }

  // Append dataset entry to HTML table
  document.querySelector("#datasets").innerHTML += `
  <tr>
    <td>${dataset.transaction_id}</td>
    <td>${dataset.transaction_date}</td>
    <td>${dataset.transaction_time}</td>
    <td>${dataset.transaction_qty}</td>
    <td>${dataset.store_id}</td>
    <td>${dataset.store_location}</td>
    <td>${dataset.product_id}</td>
    <td>${dataset.unit_price}</td>
    <td>${dataset.product_category}</td>
    <td>${dataset.product_type}</td>
    <td>${dataset.product_detail}</td>
  </tr>
  `;
}

// Display total revenue and transactions
document.querySelector("#totalrevenue").innerHTML =
  "$" + totalrevenue.toFixed(2);
document.querySelector("#totaltransaction").innerHTML = totaltransactions;
document.querySelector("#percent").innerHTML =
  (totalrevenue / datasets.length) * 100;
console.log(producttransaction);

// Function to create charts using Chart.js
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

// Prepare data for the "Transaction by Each Day" chart
function getdatabytransactionbyeachday(items) {
  let result = [];
  let colours = ["darkgrey", "grey", "black"];
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    let data = [];
    let backgroundColor = [];
    for (let j = 0; j < 7; j++) {
      const day = j;
      data.push(item.days[day] ? item.days[day] : 0);
      backgroundColor.push(colours[index]);
    }
    result.push({
      label: item.name,
      backgroundColor: backgroundColor,
      data: data,
    });
  }
  return result;
}

// Create the "Transaction by Each Day" chart
const transaction_by_each_day = createChart(
  ["Monday", "Tuesday", "Wedsday", "Thursday", "Friday", "Saturday", "Sunday"],
  getdatabytransactionbyeachday(transactionbyeachday),
  {
    plugins: {
      legend: {position: 'bottom',
        labels: {
          font: {
            size: 16,
            family: "Ubuntu",
          },
        },
      },
    },
  },
  "transaction-by-day-Chart",
  "bar"
);

// Prepare data for the "Transaction by Hour" chart
function getdatabytransactionbyhour(items) {
  let hasil = [];
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    let data = [];

    for (let j = 7; j < 21; j++) {
      data.push(item.hours[j] ? item.hours[j] : 0);
    }
    hasil.push({
      label: item.name,
      data: data,
    });
  }
  return hasil;
}

// Create the "Transaction by Hour" chart
const transaction_by_hour_chart = createChart(
  [
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
  ],
  getdatabytransactionbyhour(transactionbyhour),
  {
    plugins: {
      legend: {position: 'bottom',
        labels: {
          font: {
            size: 16,
            family: "Ubuntu",
          },
        },
      },
    },
  },
  "transaction-by-hour-chart",
  "line"
);

// Create the "Transaction by Month" chart
const transaction_by_month_chart = createChart(
  ["January", "February", "March", "April", "May", "June"],
  [
    {
      label: "Lower Manhattan",
      data: [65100, 12034, 8000, 7900, 56000, 55000],
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
      data: [61100, 23214, 8000, 81000, 56000, 55000],
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
      data: [69000, 59000, 8900, 81000, 56000, 55000],
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
  {
    plugins: {
      legend: {position: 'bottom',
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
  },
  "transaction-by-month-chart",
  "line"
);

// Create the "Store Location Revenue" chart
const store_location_revenue_chart = createChart(
  ["Total Pendapatan"],
  [
    {
      label: "Lower Manhattan",
      data: [651],
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
  {
    plugins: {
      legend: {position: 'bottom',
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
  },
  "store-location-revenue-chart",
  "bar"
);

// Prepare data for the "Product Transaction by Store" chart
function getdatabyproducttransaction(items) {
  let hasil = [];
  let total = {
    label: "Total",
    data: [],
  };
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    let data = [];
    let categories = [
      "Coffee",
      "Bakery",
      "Drinking Chocolate",
      "Tea",
      "Flavours",
      "Coffee Beans",
      "Branded",
      "Loose Tea",
      "Packaged Chocolate",
    ];
    for (let j = 0; j < categories.length; j++) {
      data.push(
        item.categories[categories[j]] ? item.categories[categories[j]] : 0
      );
      total.data[j] = total.data[j]
        ? total.data[j] + item.categories[categories[j]]
        : item.categories[categories[j]]
        ? item.categories[categories[j]]
        : 0;
    }
    hasil.push({
      label: item.name,
      data: data,
    });
  }
  hasil.push(total);
  return hasil;
}
console.log(getdatabyproducttransaction(producttransaction));

// Create the "Product Transaction by Store" chart
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
  ],
  getdatabyproducttransaction(producttransaction),
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
    plugins: {
      maintainAspectRatio: false ,
      legend: {position: 'bottom',
        labels: {
          font: {
            size: 16,
            family: "Ubuntu",
          },
        },
      },
    },
  },
  "Product-Transaction-by-Store-chart",
  "bar"
);

// Create the "Revenue by Weekday/Weekend" chart
const Revenue_by_Weekday_Weekend_chart = createChart(
  ["Weekday", "Weekend"],
  [
    {
      label: "Revenue",
      data: [1000, 250],
      backgroundColor: ["blue", "skyblue"],
    },
  ],
  {
    plugins: {
      legend: {position: 'bottom',
        labels: {
          font: {
            size: 16,
            family: "Ubuntu",
          },
        },
      },
    },
  },
  "Revenue-by-Weekday/Weekend-chart",
  "pie"
);

// Initialize DataTable for the HTML table
let table = new DataTable("#myTable");

console.log(window);
