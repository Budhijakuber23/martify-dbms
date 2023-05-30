import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "primereact/chart";

function Q6() {
  const [isq1, setIsq1] = useState(true);
  const [q1List, setq1List] = useState([]);

  useEffect(() => {
    if (isq1) {
      axios
        .get("http://localhost:3001/api/q6")
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

  const leftAxisData = q1List.slice(0, 10).map((val) => val.Price);
  const rightAxisData = q1List.slice(10, 20).map((val) => val.Price);
  const chartData = {
    labels: q1List.slice(0, 10).map((val) => val.Name),
    datasets: [
      {
        label: "Highest ten",
        data: leftAxisData,
        fill: false,
        borderColor: "#007be5",
        yAxisID: "left-axis",
      },
      {
        label: "Lowest ten ",
        data: rightAxisData,
        fill: false,
        borderColor: "#20d077",
        yAxisID: "right-axis",
      },
    ],
  };
  const chartOptions = {
    scales: {
      yAxes: [
        {
          id: "left-axis",
          type: "linear",
          position: "left",
        },
        {
          id: "right-axis",
          type: "linear",
          position: "right",
        },
      ],
    },
  };

  return (
    <div>
      <button type="submit" onClick={fnq1}>
        {isq1 ? "Hide query" : "Show query"}
      </button>
      {isq1 && (
        <Chart type="line" data={chartData} options={chartOptions} />
      )}
    </div>
  );
}

export default Q6;
