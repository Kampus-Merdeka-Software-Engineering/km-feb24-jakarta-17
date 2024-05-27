import datasets from "./dataset-team17.json" assert { type: "json" };

let totaltransactions = 0;
let totalrevenue = 0;
let transactionbyeachday = [];
for (let index = 0; index < datasets.length; index++) {
  const dataset = datasets[index];
  console.log(new Date(dataset.transaction_date));
  totalrevenue += dataset.unit_price * dataset.transaction_qty;
  totaltransactions += dataset.transaction_qty;
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
  document.querySelector("#datasets").innerHTML += `
  <tr>
    <td>
    ${dataset.transaction_id}
    </td>
    <td>
    ${dataset.transaction_date}
    </td>
    <td>
    ${dataset.transaction_time}
    </td>
    <td>
    ${dataset.transaction_qty}
    </td>
    <td>
    ${dataset.store_id}
    </td>
    <td>
    ${dataset.store_location}
    
    </td>
    <td>
    ${dataset.product_id}
    
    </td>
    <td>
    ${dataset.unit_price}
    
    </td>
    <td>
    ${dataset.product_category}
    
    </td>
    <td>
    ${dataset.product_type}
    
    </td>
    <td>
    ${dataset.product_detail}
    
    </td>
  </tr>
  `;
}
document.querySelector("#totalrevenue").innerHTML =
  "$" + totalrevenue.toFixed(2);
document.querySelector("#totaltransaction").innerHTML = totaltransactions;
console.log(transactionbyeachday);

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
  return result
}

const transaction_by_each_day = createChart(
  ["Monday", "Tuesday", "Wedsday", "Thursday", "Friday", "Saturday", "Sunday"], // array x:
 /* [
    {
      label: "Lower Manhattan", // 3 label buat bar chartnya: // ini juga sebagai legend:
      data: [740300, 703200, 737000, 742700, 732500, 694200, 707300], // array index sesuai dengan jumlah data di labels:
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
      data: [710400, 747200, 717300, 730700, 748900, 684600, 734400],
      backgroundColor: ["grey", "grey", "grey", "grey", "grey", "grey", "grey"],
    },
    {
      label: "Hell's Kitchen",
      data: [713600, 669600, 676700, 692000, 686000, 672200, 667900],
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
  ], **/
  getdatabytransactionbyeachday(transactionbyeachday),
  {
    plugins: {
      legend: {
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
  {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,
            family: "Ubuntu",
          },
        },
      },
    },
  },
  "transaction-by-hour-chart", //sesuai di canvas html:
  "line"
);

// transaction_by_month_chart:
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
    maintainAspectRatio: false,
    responsive: false,
    /* scales: {
      y: {
        autoSkip: true,
        ticks: {
          maxTicksLimit: 10, // Set the maximum number of ticks on the y-axis
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,
            family: "Ubuntu",
          },
        },
      },
    } */
  },
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
  {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,
            family: "Ubuntu",
          },
        },
      },
    },
  },
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
    " ",
  ], // array x:
  [
    {
      label: "Lower Manhattan", // 3 label buat bar chartnya: // ini juga sebagai legend:
      data: [651, 200, 300, 100, 100, 100, 100, 100], // array index sesuai dengan jumlah data di labels:
      backgroundColor: ["#F1DEC9"],
    },
    {
      label: "Astoria",
      data: [651, 200, 300, 100, 100, 100, 100, 100],
      backgroundColor: ["#6AC8B6"],
    },
    {
      label: "Hell's Kitchen",
      data: [651, 200, 300, 100, 100, 100, 100, 100],
      backgroundColor: ["#A4907C"],
    },
    {
      label: "Total Penjualan",
      data: [651, 200, 300, 100, 100, 100, 100, 100],
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
    plugins: {
      resnponsive: true,
      legend: {
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
  {
    plugins: {
      legend: {
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

let table = new DataTable("#myTable");

console.log(window);
