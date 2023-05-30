import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "primereact/chart";

function Q2() {
  const [isq1, setIsq1] = useState(true);
  const [q1List, setq1List] = useState([]);

  useEffect(() => {
    if (isq1) {
      axios
        .get("http://localhost:3001/api/q2")
        .then((response) => {
          const formattedData = {
            labels: response.data.map((val) => val.Name),
            datasets: [
              {
                label: "Total Cost",
                data: response.data.map((val) => val.total_cost),
                fill: false,
                borderColor: "#42A5F5",
              },
            ],
          };
          setq1List(formattedData);
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

  return (
    <div>
      <button type="submit" onClick={fnq1}>
        {isq1 ? "Hide query" : "Show query"}
      </button>
      {isq1 && <Chart type="line" data={q1List} />}
    </div>
  );
}

export default Q2;
