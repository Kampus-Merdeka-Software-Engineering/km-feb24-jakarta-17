import datasets from "../data/dataset-team17.json" assert { type: "json" };

// Initialize variables to store total transactions and revenue
let totaltransactions = 0;
let totalrevenue = 0;
let tablefoot = 0;

// Initialize arrays to store various transaction data
let transactionbyeachday = [];
let transactionbyhour = [];
let producttransaction = [];
let transactionbymonth = [];
let percent = [];
let totalstoretransactions = [];

// Loop through each dataset entry
for (let index = 0; index < datasets.length; index++) {
  const dataset = datasets[index];

  if (percent.filter((item) => item.id === dataset.store_id).length > 0) {
    percent = percent.map((item) => {
      if (item.id === dataset.store_id) {
        return {
          ...item,
          value: item.value + dataset.unit_price * dataset.transaction_qty,
        };
      }
      return item;
    });
  } else {
    percent.push({
      name: dataset.store_location,
      id: dataset.store_id,
      value: dataset.unit_price * dataset.transaction_qty,
    });
  }

  if (
    totalstoretransactions.filter((item) => item.id === dataset.store_id)
      .length > 0
  ) {
    totalstoretransactions = totalstoretransactions.map((item) => {
      if (item.id === dataset.store_id) {
        return { ...item, value: item.value + dataset.transaction_qty };
      }
      return item;
    });
  } else {
    totalstoretransactions.push({
      name: dataset.store_location,
      id: dataset.store_id,
      value: dataset.transaction_qty,
    });
  }

  // Calculate total revenue and transactions
  totalrevenue += dataset.unit_price * dataset.transaction_qty;
  totaltransactions += 1;

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
  if (
    transactionbymonth.filter((item) => item.id === dataset.store_id).length > 0
  ) {
    transactionbymonth = transactionbymonth.map((item) => {
      if (item.id === dataset.store_id) {
        return {
          ...item,
          date: {
            ...item.date,
            [dataset.transaction_date.split("/")[0]]: item.date[
              dataset.transaction_date.split("/")[0]
            ]
              ? item.date[dataset.transaction_date.split("/")[0]] + 1
              : 1,
          },
        };
      }
      return item;
    });
  } else {
    transactionbymonth.push({
      id: dataset.store_id,
      name: dataset.store_location,
      date: {
        [dataset.transaction_date.split("/")[0]]: 1,
      },
    });
  }

  // Append dataset entry to HTML table
  /* document.querySelector("#datasets").innerHTML += `
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
  `; */
}

for (let index = 0; index < totalstoretransactions.length; index++) {
  const totalstoretransaction = totalstoretransactions[index];
  document.querySelector("#sold-quantity").innerHTML += `
  <tr>
  <td>
  ${totalstoretransaction.name}
  </td>
  <td>
  ${totalstoretransaction.value}
  </td>
  </tr>`;

  tablefoot += totalstoretransaction.value;
}

// Display total revenue and transactions
document.querySelector("#totalrevenue").innerHTML =
  "$" + totalrevenue.toFixed(2);
document.querySelector("#totaltransaction").innerHTML = totaltransactions;
document.querySelector("#percent").innerHTML = getdatabypercent(
  percent,
  totalrevenue
);

document.querySelector("#tablefoot").innerHTML = `
  <tr>
  <td>
  total
  </td>
  <td>
  ${tablefoot}
  </td>
  </tr>`;

console.log(totalstoretransactions);
function getdatabypercent(items, totalrevenue) {
  let totalrevenuepercent = 0;
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    totalrevenuepercent += (item.value / totalrevenue) * 100;
  }
  return totalrevenuepercent;
}

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
  let colours = ["#1b2b3b", "#344e60", "#a8948a"];
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
      legend: {
        position: "bottom",
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
      legend: {
        position: "bottom",
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
function getdatabytransactionbymonth(items) {
  let hasil = [];
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    let data = [];

    for (let j = 1; j < 7; j++) {
      data.push(item.date[j] ? item.date[j] : 0);
    }
    hasil.push({
      label: item.name,
      data: data,
    });
  }
  return hasil;
}
const transaction_by_month_chart = createChart(
  ["January", "February", "March", "April", "May", "June"],
  getdatabytransactionbymonth(transactionbymonth),
  {
    plugins: {
      legend: {
        position: "bottom",
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
function getdatabytotalrevenuepercent(items, totalrevenue) {
  let totalrevenuepercent = [];
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    let backgroundColor = "";
    if (item.name === "Astoria") {
      backgroundColor = "#1b2b3b";
    } else if (item.name === "Lower Manhattan") {
      backgroundColor = "#344e60";
    } else if (item.name === "Hell's Kitchen") {
      backgroundColor = "#a8948a";
    }
    totalrevenuepercent.push({
      label: item.name,
      data: [(item.value / totalrevenue) * 100],
      backgroundColor: [backgroundColor],
    });
  }
  return totalrevenuepercent;
}
const store_location_revenue_chart = createChart(
  ["Total Pendapatan"],
  getdatabytotalrevenuepercent(percent, totalrevenue),
  {
    plugins: {
      legend: {
        position: "bottom",
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
      let totalcategories = item.categories[categories[j]]
        ? item.categories[categories[j]]
        : 0;
      total.data[j] = total.data[j]
        ? total.data[j] + totalcategories
        : totalcategories;
    }
    hasil.push({
      label: item.name,
      data: data,
    });
  }
  hasil.push(total);
  return hasil;
}

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
      maintainAspectRatio: false,
      legend: {
        position: "bottom",
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
/* const Revenue_by_Weekday_Weekend_chart = createChart(
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
      legend: {
        position: "bottom",
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
); */

// Initialize DataTable for the HTML table
let table = new DataTable("#myTable", {
  columns: [
    { data: "transaction_id", name: "transaction_id" },
    { data: "transaction_date", name: "transaction_date" },
    { data: "transaction_time", name: "transaction_time" },
    { data: "transaction_qty", name: "transaction_qty" },
    { data: "store_id", name: "store_id" },
    { data: "store_location", name: "store_location" },
    { data: "product_id", name: "product_id" },
    { data: "unit_price", name: "unit_price" },
    { data: "product_category", name: "product_category" },
    { data: "product_type", name: "product_type" },
    { data: "product_detail", name: "product_detail" },
  ],
  data: datasets,
});

let buttonfilter = document.querySelectorAll(".storefilter");
buttonfilter.forEach((button) => {
  button.addEventListener("click", (event) => {
    let storefiltervalue = event.target.value;
    let rows = datasets.filter(
      (item) => item.store_location === storefiltervalue
    );
    let totaltransactions = 0;
    let totalrevenue = 0;
    let tablefoot = 0;

    // Initialize arrays to store various transaction data
    let transactionbyeachday = [];
    let transactionbyhour = [];
    let producttransaction = [];
    let transactionbymonth = [];
    let percent = [];
    let totalstoretransactions = [];

    // Loop through each dataset entry
    for (let index = 0; index < rows.length; index++) {
      const dataset = rows[index];

      if (percent.filter((item) => item.id === dataset.store_id).length > 0) {
        percent = percent.map((item) => {
          if (item.id === dataset.store_id) {
            return {
              ...item,
              value: item.value + dataset.unit_price * dataset.transaction_qty,
            };
          }
          return item;
        });
      } else {
        percent.push({
          name: dataset.store_location,
          id: dataset.store_id,
          value: dataset.unit_price * dataset.transaction_qty,
        });
      }

      if (
        totalstoretransactions.filter((item) => item.id === dataset.store_id)
          .length > 0
      ) {
        totalstoretransactions = totalstoretransactions.map((item) => {
          if (item.id === dataset.store_id) {
            return { ...item, value: item.value + dataset.transaction_qty };
          }
          return item;
        });
      } else {
        totalstoretransactions.push({
          name: dataset.store_location,
          id: dataset.store_id,
          value: dataset.transaction_qty,
        });
      }

      // Calculate total revenue and transactions
      totalrevenue += dataset.unit_price * dataset.transaction_qty;
      totaltransactions += 1;

      // Update transaction data by hour for each store
      if (
        transactionbyhour.filter((item) => item.id === dataset.store_id)
          .length > 0
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
        producttransaction.filter((item) => item.id === dataset.store_id)
          .length > 0
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
      if (
        transactionbymonth.filter((item) => item.id === dataset.store_id)
          .length > 0
      ) {
        transactionbymonth = transactionbymonth.map((item) => {
          if (item.id === dataset.store_id) {
            return {
              ...item,
              date: {
                ...item.date,
                [dataset.transaction_date.split("/")[0]]: item.date[
                  dataset.transaction_date.split("/")[0]
                ]
                  ? item.date[dataset.transaction_date.split("/")[0]] + 1
                  : 1,
              },
            };
          }
          return item;
        });
      } else {
        transactionbymonth.push({
          id: dataset.store_id,
          name: dataset.store_location,
          date: {
            [dataset.transaction_date.split("/")[0]]: 1,
          },
        });
      }
    }

    for (let index = 0; index < totalstoretransactions.length; index++) {
      const totalstoretransaction = totalstoretransactions[index];
      document.querySelector("#sold-quantity").innerHTML += `
      <tr>
      <td>
      ${totalstoretransaction.name}
      </td>
      <td>
      ${totalstoretransaction.value}
      </td>
      </tr>`;

      tablefoot += totalstoretransaction.value;
    }
    document.querySelector("#totalrevenue").innerHTML =
      "$" + totalrevenue.toFixed(2);
    document.querySelector("#totaltransaction").innerHTML = totaltransactions;
    document.querySelector("#percent").innerHTML = getdatabypercent(
      percent,
      totalrevenue
    );

    document.querySelector("#tablefoot").innerHTML = `
  <tr>
  <td>
  total
  </td>
  <td>
  ${tablefoot}
  </td>
  </tr>`;
    console.log(totalstoretransactions);
  });
});

document.addEventListener("DOMContentLoaded", (event) => {
  const buttons = document.querySelectorAll(".buttons button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
    });
  });
});
