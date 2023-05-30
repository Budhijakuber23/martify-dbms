const mysql2 = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const path  = require('path');
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Jaimatadi91',
    database : 'martify',
});

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());



// queries for analyst
app.get("/api/cat1", (req, res) => {
    const searchInput = req.query.search || "";
    if (searchInput === "") {
      const sqlStatement = "SELECT * FROM product;";
      db.query(sqlStatement, (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).send("Error fetching data from database");
        } else {
          console.log(result);
          res.json(result);
        }
      });
    } else {
      const sqlStatement =
        "SELECT * FROM product WHERE Name LIKE ? OR Product_id LIKE ?";
      const searchValue = `%${searchInput}%`;
      db.query(sqlStatement, [searchValue, searchValue], (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).send("Error fetching data from database");
        } else {
          console.log(result);
          res.json(result);
        }
      });
    }
  });

//cart query

app.post("/api/cart", async (req, res) => {
  try {
    const { product_id, quantity, price, name } = req.body;
    
    // check if product already exists in the cart
    const [rows] = await db.promise().query("SELECT * FROM cart WHERE product_id = ?", [product_id]);
    if (rows.length > 0) {
      // product already exists, update quantity
      const newQuantity = rows[0].quantity + parseInt(quantity);
      await db.promise().query("UPDATE cart SET quantity = ? WHERE product_id = ?", [newQuantity, product_id]);
      res.status(200).send("Quantity updated successfully");
    } else {
      // product doesn't exist, create new row
      await db.promise().query("INSERT INTO cart (product_id, quantity, price, name) VALUES (?, ?, ?, ?)", [product_id, parseInt(quantity), price, name]);
      res.status(200).send("Product added to cart successfully");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error inserting data into cart table");
  }
});


//query 1
app.get('/api/q1', (req, res) => {
    const sqlStatement = "SELECT Name, Product_id, Price FROM product GROUP BY Name, Product_id WITH ROLLUP HAVING name IN (SELECT Name from product WHERE Name = 'TV' or Name = 'Mobile Phone');"
    db.query(sqlStatement, (error, result) =>{
        if (error) {
            console.log(error);
            res.status(500).send('Error fetching data from database');
        } else {
            console.log(result)
            res.json(result)
        }
    })
});

app.get('/api/q2', (req, res) => {
    const sqlStatement = "SELECT sc.cart_id, sc.total_cost, c.Name FROM shopping_cart sc JOIN Customer c on sc.customer_id = c.customer_id HAVING sc.total_cost >= 3000 ORDER BY sc.total_cost ASC;";
    db.query(sqlStatement, (error, result) =>{
        if (error) {
            console.log(error);
            res.status(500).send('Error fetching data from database');
        } else {
            console.log(result)
            res.json(result)
        }
    })
});

app.get('/api/q3', (req, res) => {
    const sqlStatement = "SELECT * FROM Customer c WHERE c.Customer_id IN (SELECT o.order_id FROM `myorder` o WHERE o.order_date >= DATE_SUB(NOW(), INTERVAL 3 MONTH));"
    db.query(sqlStatement, (error, result) =>{
        if (error) {
            console.log(error);
            res.status(500).send('Error fetching data from database');
        } else {
            console.log(result)
            res.json(result)
        }
    })
});

app.get('/api/q4', (req, res) => {
    const sqlStatement = "SELECT pg.Payment_method, SUM(pg.Amount) as Total_Revenue FROM Payment_Gateway pg JOIN `myorder` o ON pg.Payment_id = o.order_id GROUP BY pg.Payment_method;"
    db.query(sqlStatement, (error, result) =>{
        if (error) {
            console.log(error);
            res.status(500).send('Error fetching data from database');
        } else {
            console.log(result)
            res.json(result)
        }
    })
});

app.get('/api/q5', (req, res) => {
    const sqlStatement = "SELECT SUBSTRING(oi.Combination_of_order_and_product_id, 1, 1) as Product_ID, AVG(oi.Quantity) as Avg_Quantity FROM `Order_Items` oi JOIN `Customer` c GROUP BY SUBSTRING(oi.Combination_of_order_and_product_id, 1, 1) ORDER BY Avg_Quantity DESC;"
    db.query(sqlStatement, (error, result) =>{
        if (error) {
            console.log(error);
            res.status(500).send('Error fetching data from database');
        } else {
            console.log(result)
            res.json(result)
        }
    })
});

app.get('/api/q6', (req, res) => {
    const sqlStatement = "SELECT * FROM (SELECT Product_id, Name, Price FROM Product ORDER BY Price DESC LIMIT 10) t UNION ALL SELECT * FROM (SELECT Product_id, Name, Price FROM Product ORDER BY Price ASC LIMIT 10) s; "
    db.query(sqlStatement, (error, result) =>{
        if (error) {
            console.log(error);
            res.status(500).send('Error fetching data from database');
        } else {
            console.log(result)
            res.json(result)
        }
    })
});


// queries for admin
app.get('/api/companies', (req, res) => {
    const sqlStatement = "SELECT * FROM company;"
    db.query(sqlStatement, (error, result) =>{
        if (error) {
            console.log(error);
            res.status(500).send('Error fetching data from database');
        } else {
            console.log(result)
            res.json(result)
        }
    })
});

app.get('/api/supplier', (req, res) => {
    const sqlStatement = "SELECT * FROM supplier;"
    db.query(sqlStatement, (error, result) =>{
        if (error) {
            console.log(error);
            res.status(500).send('Error fetching data from database');
        } else {
            console.log(result)
            res.json(result)
        }
    })
});

app.get('/api/storage', (req, res) => {
    const sqlStatement = "SELECT * FROM storage;"
    db.query(sqlStatement, (error, result) =>{
        if (error) {
            console.log(error);
            res.status(500).send('Error fetching data from database');
        } else {
            console.log(result)
            res.json(result)
        }
    })
});


app.post('/api/add-company', (req, res) => {
    const sqlSt1 = "INSERT INTO company (Company_id , Name) VALUES (?,?);"
    const sqlSt2 = "INSERT INTO company_contact_nos (Company_id, Contact_no1, Contact_no2) VALUES (?,?,?) ON DUPLICATE KEY UPDATE Contact_no1 = VALUES(Contact_no1), Contact_no2 = VALUES(Contact_no2);"

  
    db.beginTransaction((err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error inserting data into database');
        return;
      }
  
      db.query(sqlSt1, [req.body.id, req.body.name], (err, result) => {
        if (err) {
          console.log(err);
          db.rollback(() => {
            res.status(500).send('Error inserting data into database');
          });
          return;
        }
  
        db.query(sqlSt2, [req.body.id, req.body.contactNumber1, req.body.contactNumber2], (err, result) => {
          if (err) {
            console.log(err);
            db.rollback(() => {
              res.status(500).send('Error inserting data into database');
            });
            return;
          }
  
          db.commit((err) => {
            if (err) {
              console.log(err);
              db.rollback(() => {
                res.status(500).send('Error inserting data into database');
              });
              return;
            }
  
            console.log("Data inserted successfully");
            res.status(200).send('Data inserted successfully');
          });
        });
      });
    });
});

app.post('/api/add-supplier', (req, res) => {
  const sqlSt1 = "INSERT INTO supplier (supplier_id , Name, order_id) VALUES (?,?,?);"
  const sqlSt2 = "INSERT INTO supplier_contact_nos (supplier_id, Contact_no1, Contact_no2) VALUES (?,?,?) ON DUPLICATE KEY UPDATE Contact_no1 = VALUES(Contact_no1), Contact_no2 = VALUES(Contact_no2);"

  db.beginTransaction((err) => {
      if (err) {
          console.log(err);
          res.status(500).send('Error inserting data into database');
          return;
      }

      db.query("SELECT * FROM supplier WHERE supplier_id = ? FOR SHARE", [req.body.supplier_id], (err, result) => {
          if (err) {
              console.log(err);
              db.rollback(() => {
                  res.status(500).send('Error inserting data into database');
              });
              return;
          }

          db.query(sqlSt1, [req.body.supplier_id, req.body.name, req.body.orderId], (err, result) => {
              if (err) {
                  console.log(err);
                  db.rollback(() => {
                      res.status(500).send('Error inserting data into database');
                  });
                  return;
              }

              db.query(sqlSt2, [req.body.supplier_id, req.body.contactNumber, req.body.contactNumber], (err, result) => {
                  if (err) {
                      console.log(err);
                      db.rollback(() => {
                          res.status(500).send('Error inserting data into database');
                      });
                      return;
                  }

                  db.commit((err) => {
                      if (err) {
                          console.log(err);
                          db.rollback(() => {
                              res.status(500).send('Error inserting data into database');
                          });
                          return;
                      }

                      console.log("Data inserted successfully");
                      res.status(200).send('Data inserted successfully');
                  });
              });
          });
      });
  });
});

// The FOR SHARE clause ensures that other transactions can read but cannot modify
// or insert into the row until the current transaction is committed or rolled back.


app.post('/api/add-storage', (req, res) => {
  const sqlSt1 = "INSERT INTO storage (Store_id , Location, Quantity, Product_id) VALUES (?,?,?,?);"
  const sqlSt2 = "INSERT INTO storage_contact_nos (Store_id, Contact_no1, Contact_no2) VALUES (?,?,?) ON DUPLICATE KEY UPDATE Contact_no1 = VALUES(Contact_no1), Contact_no2 = VALUES(Contact_no2);"

  db.beginTransaction((err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error inserting data into database');
      return;
    }

    // Lock the rows in the storage table that match the given Store_id and Product_id
    db.query('SELECT * FROM storage WHERE Store_id = ? AND Product_id = ? FOR UPDATE', [req.body.id, req.body.productId], (err, result) => {
      if (err) {
        console.log(err);
        db.rollback(() => {
          res.status(500).send('Error inserting data into database');
        });
        return;
      }

      // Insert the new row into the storage table
      db.query(sqlSt1, [req.body.id, req.body.location, req.body.quantity, req.body.productId] , (err, result) => {
        if (err) {
          console.log(err);
          db.rollback(() => {
            res.status(500).send('Error inserting data into database');
          });
          return;
        }

        // Lock the rows in the storage_contact_nos table that match the given Store_id
        db.query('SELECT * FROM storage_contact_nos WHERE Store_id = ? FOR UPDATE', [req.body.id], (err, result) => {
          if (err) {
            console.log(err);
            db.rollback(() => {
              res.status(500).send('Error inserting data into database');
            });
            return;
          }

          // Insert or update the row in the storage_contact_nos table
          db.query(sqlSt2, [req.body.id, req.body.contactNumber, req.body.contactNumber], (err, result) => {
            if (err) {
              console.log(err);
              db.rollback(() => {
                res.status(500).send('Error inserting data into database');
              });
              return;
            }

            db.commit((err) => {
              if (err) {
                console.log(err);
                db.rollback(() => {
                  res.status(500).send('Error inserting data into database');
                });
                return;
              }

              console.log("Data inserted successfully");
              res.status(200).send('Data inserted successfully');
            });
          });
        });
      });
    });
  });
});


// we use the FOR UPDATE clause to lock the rows in the storage and storage_contact_nos tables before we insert or update them.
// This ensures that other transactions cannot modify the same rows at the same time, which makes the transaction conflict serializable.

app.get('/api/cart', (req, res) =>{
    const sqlStatement ="SELECT * FROM cart";
    // const searchValue = `%${searchInput}%`;
    db.query(sqlStatement, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send("Error fetching data from database");
        } else {
            console.log(result);
            res.json(result);
        }
    });
})

// queries for cart
// ...
app.post("/api/loginC", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const [rows] = await db.promise().query("SELECT * FROM Customer WHERE Name=? AND Email=? AND Password=?", [username, email, password]);
    if (rows.length > 0) {
      res.send("success");
    } else {
      res.send("fail");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error logging in user");
  }
});

app.get('/api/users/:username', (req, res) => {
  const { username } = req.params;
  const sql = 'SELECT * FROM customer WHERE Name = ?';
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(`Error fetching data for user ${username} from database`);
    } else if (results.length === 0) {
      res.status(404).send(`User ${username} not found`);
    } else {
      res.send(results[0]);
    }
  });
});

app.get('/api/users/:productname', (req, res)=>{
  const {productname} = req.params;

  const sql = 'CREATE INDEX p_name ON products = ? '
  db.query(sql, [productname], (err, result) =>{
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
    }
  });
});

app.get('/api/users/:customername', (req, res)=>{
  const {customername} = req.params;

  const sql = 'CREATE VIEW custName AS SELECT * FROM customer WHERE name = ? '
  db.query(sql, [customername], (err, result) =>{
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
    }
  });
});


app.get('/api/admin/grant', (req, res)=>{
  const sql = 'GRANT SELECT, CREATE USER, SHOW DATABASE ON martify'
  
  db.query(sql, (err, result)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("GRANTED");
    }
  })
})
// app.delete('/api/cart/:id', (req, res) => {
//   const id = req.params.id;
//   const index = cart.findIndex((item) => item.cart_id === id);

//   if (index !== -1) {
//     cart.splice(index, 1);
//     res.status(204).send();
//   } else {
//     res.status(404).send();
//   }
// });

app.delete("/api/cart/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;
    const result = await db.promise().query("DELETE FROM cart WHERE product_id = ?", [product_id]);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting data from cart table");
  }
});

app.post("/api/sign-up", (req, res) => {
  const { username, email, password, address } = req.body;

  // Check if username and email already exist in the database
  db.query("SELECT * FROM customer WHERE Name = ? OR Email = ?", [username, email], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Server error");
    } else if (results.length > 0) {
      res.status(400).send("Username or email already exists");
    } else {
      // Get the maximum customer_id from the database and assign a new customer_id that does not already exist
      db.query("SELECT MAX(Customer_id) as max_id FROM customer", (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Server error");
        } else {
          const max_id = results[0].max_id;
          const new_id = max_id ? max_id + 1 : 1;

          // Insert the new customer into the database
          db.query("INSERT INTO customer (Customer_id, Name, Address, Email, Password) VALUES (?, ?, ?, ?, ?)", [new_id, username, address, email, password], (err, results) => {
            if (err) {
              console.log(err);
              res.status(500).send("Server error");
            } else {
              res.send("success");
            }
          });
        }
      });
    }
  });
});



app.listen(3001, () => {
    console.log("Server running on port 3001");
    db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) {
            console.log(error);
        } else {
            console.log('Database connection successful');
        }
    });
});
