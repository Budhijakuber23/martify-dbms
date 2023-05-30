import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "primereact/chart";
// import './q.css'

function Q1() {
  const [isq1, setIsq1] = useState(true);
  const [q1List, setq1List] = useState([]);

  useEffect(() => {
    if (isq1) {
      axios
        .get("http://localhost:3001/api/q1")
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
    labels: q1List.map((val) => val.Name),
    datasets: [
      {
        label: "Price",
        data: q1List.map((val) => val.Price),
        fill: false,
        backgroundColor: "chocolate", // change color to chocolate
        borderColor: "chocolate", // change color to chocolate
      },
    ],
  };

  const chartStyle = {
    height: "800px",
    width: "1200px",
  };

  return (
    <div>
      <button type="submit" onClick={fnq1}>
        {isq1 ? "Hide query" : "Show query"}
      </button>
      {isq1 && (
        <Chart type="bar" data={chartData} style={chartStyle} />
      )}
    </div>
  );
}

export default Q1;
