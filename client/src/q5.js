import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "primereact/chart";

function Q5() {
  const [isq1, setIsq1] = useState(true);
  const [q1List, setq1List] = useState([]);

  useEffect(() => {
    if (isq1) {
      axios
        .get("http://localhost:3001/api/q5")
        .then((response) => {
          setq1List(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isq1]);

  const fnq1 = () => {
    setIsq1(!isq1);
  };

  const chartData = {
    labels: q1List.map((val) => val.Product_ID),
    datasets: [
      {
        data: q1List.map((val) => val.Avg_Quantity),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#C9CBCF",
        ],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
    },
    maintainAspectRatio: false,
    radius: "50%",
  };

  return (
    <div>
      <button type="submit" onClick={fnq1}>
        {isq1 ? "Hide query" : "Show query"}
      </button>
      <div style={{ display: "flex" }}>
        {isq1 && (
          <Chart type="pie" data={chartData} options={chartOptions} style={{ width: "500px", height: "500px" }} />
        )}
        <table style={{ marginLeft: "30px",width: '50%', marginRight: '20px' }}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Average Quantity</th>
            </tr>
          </thead>
          <tbody>
            {q1List.map((val) => {
              return (
                <tr key={val.Product_ID}>
                  <td>{val.Product_ID}</td>
                  <td>{val.Avg_Quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Q5;
