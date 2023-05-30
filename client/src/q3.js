import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./Q3.css";

function Q3() {
  const [isq1, setIsq1] = useState(true);
  const [q1List, setq1List] = useState([]);

  useEffect(() => {
    if (isq1) {
      axios
        .get("http://localhost:3001/api/q3")
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

  return (
    <div>
      <button type="submit" onClick={fnq1}>
        {isq1 ? "Hide query" : "Show query"}
      </button>
      {isq1 && (
        <DataTable
          value={q1List}
          resizableColumns
          columnResizeMode="expand"
          className="tb"
          style={{ backgroundColor: "white" }}
          headerStyle={{ backgroundColor: "chocolate", color: "chocolate" }}
        >
          <Column field="Customer_id" header="Customer ID" sortable />
          <Column field="Name" header="Customer Name" sortable />
          <Column field="Address" header="Address" sortable />
          <Column field="Email" header="Email" sortable />
        </DataTable>
      )}
    </div>
  );
}

export default Q3;
