import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { useTable } from "react-table";
import './cat1.css'

function Cart() {
  const [cartList, setCartList] = useState([]);
  const toast = useRef(null);
  const [username, setUsername] = useState("");
  useEffect(() => {
    // Retrieve logged-in user's name from local storage
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/cart")
      .then((response) => {
        setCartList(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (product_id) => {
    console.log(product_id);
    axios
      .delete(`http://localhost:3001/api/cart/${product_id}`)
      .then(() => {
        setCartList((prevCartList) =>
          prevCartList.filter((item) => item.product_id !== product_id)
        );
        toast.current.show({
          severity: "success",
          summary: "Success Message",
          detail: "Item deleted successfully",
          life: 3000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Product ID",
        accessor: "product_id",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "",
        accessor: "cart_id",
        Cell: ({ row }) => (
          <div className="delete-icon" onClick={() => handleDelete(row.original.product_id)}>
            <FaTrash />
          </div>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => cartList, [cartList]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <>
    <nav>
    <ul>
      <li><a href="/customer">Home</a></li>
      <li><a href={`/profile/${username}`}>Profile</a></li>
      <li><a href="/cart">My Cart</a></li>
    </ul>
  </nav>
    <div className="catalog-container">
      <table {...getTableProps()} className="product-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default Cart;
