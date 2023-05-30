import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "primereact/chart";

function Q4() {
  const [isq1, setIsq1] = useState(true);
  const [q1List, setq1List] = useState([]);

  useEffect(() => {
    if (isq1) {
      axios
        .get("http://localhost:3001/api/q4")
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

  const getChartData = () => {
    const labels = q1List.map((val) => val.Payment_method);
    const data = q1List.map((val) => val.Total_Revenue);

    return {
      labels: labels,
      datasets: [
        {
          label: "Total Revenue",
          data: data,
          fill: false,
          borderColor: "#42A5F5",
        },
      ],
    };
  };

  return (
    <div>
      <button type="submit" onClick={fnq1}>
        {isq1 ? "Hide query" : "Show query"}
      </button>
      {isq1 && (
        <div className="card">
          <Chart type="line" data={getChartData()} />
        </div>
      )}
    </div>
  );
}

export default Q4;
