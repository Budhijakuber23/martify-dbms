import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './admin.css';

function AdminPage() {
  const [isViewAllClicked, setIsViewAllClicked] = useState(false);
  const [isViewAllClickedsupp, setIsViewAllClickedsupp] = useState(false);
  const [isViewAllClickedstorage, setIsViewAllClickedstorage] = useState(false);

  const[companyList, setCompanyList] = useState([]);
  const[supplierList, setSupplierList] = useState([]);
  const[storageList, setStorageList] = useState([]);


  useEffect(() => {
    if (isViewAllClicked) {
      axios
        .get('http://localhost:3001/api/companies')
        .then((response) => {
          setCompanyList(response.data)
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isViewAllClicked]);

  useEffect(() => {
    if (isViewAllClickedsupp) {
      axios
        .get('http://localhost:3001/api/supplier')
        .then((response) => {
          setSupplierList(response.data)
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isViewAllClickedsupp]);

  useEffect(() => {
    if (isViewAllClickedstorage) {
      axios
        .get('http://localhost:3001/api/storage')
        .then((response) => {
          setStorageList(response.data)
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isViewAllClickedstorage]);


  const [feedbackMessages, setFeedbackMessages] = useState([]);
  const [newCompany, setNewCompany] = useState({
    id: '',
    name: '',
    contactNumber1: '',
    contactNumber2: '',
  });
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    supplier_id:'',
    orderId: '',
    contactNumber: '',
  });
  const [newStorage, setNewStorage] = useState({
    id: '',
    location: '',
    quantity: '',
    productId: '',
    contactNumber: '',
  });

  const handleNewCompanyChange = (event) => {
    const { name, value } = event.target;
    setNewCompany({ ...newCompany, [name]: value });
  };

  const handleNewSupplierChange = (event) => {
    const { name, value } = event.target;
    setNewSupplier({ ...newSupplier, [name]: value });
  };

  const handleNewStorageChange = (event) => {
    const { name, value } = event.target;
    setNewStorage({ ...newStorage, [name]: value });
  };

  const handleAddNewCompany = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:3001/api/add-company', newCompany)
      .then((response) => {
        console.log(response);
        // handle success
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });
  };

  const handleAddNewSupplier = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:3001/api/add-supplier', newSupplier)
      .then((response) => {
        console.log(response);
        // handle success
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });
  };
  const showComp = () => {
    setIsViewAllClicked(!isViewAllClicked);
  };

  const showSupp = () => {
    setIsViewAllClickedsupp(!isViewAllClickedsupp);
  };
  const showStorage = () => {
    setIsViewAllClickedstorage(!isViewAllClickedstorage);
  };
  
  const handleAddNewStorage = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/api/add-storage', newStorage)
      .then(response => {
        console.log(response);
        // handle success
      })
      .catch(error => {
        console.log(error);
        // handle error
      });
  };

  return (
    <>
    <div className="admin-page">
      <Link to="/feedbacks"><h2>Click here to Customer's Feedback</h2></Link>
      <div className="admin-page__add-company">
        <h2>Add New Company</h2>
        <form onSubmit={handleAddNewCompany}>
          <input
            type="text"
            placeholder="Company ID"
            name="id"
            value={newCompany.id}
            onChange={handleNewCompanyChange}
          />
          <input
            type="text"
            placeholder="Company Name"
            name="name"
            value={newCompany.name}
            onChange={handleNewCompanyChange}
          />
          <input
            type="text"
            placeholder="Contact Number 1"
            name="contactNumber1"
            value={newCompany.contactNumber1}
            onChange={handleNewCompanyChange}
          />
          <input
            type="text"
            placeholder="Contact Number 2"
            name="contactNumber2"
            value={newCompany.contactNumber2}
            onChange={handleNewCompanyChange}
          />
          <button type="submit">Add Company</button>
        </form>
      </div>
      <div className="admin-page__add-supplier">
        <h2>Add New Supplier</h2>
        <form onSubmit={handleAddNewSupplier}>
        <input
        type="text"
        placeholder="Supplier ID"
        name="supplier_id"
        value={newSupplier.supplier_id}
        onChange={handleNewSupplierChange}
      />
        <input
        type="text"
        placeholder="Supplier Name"
        name="name"
        value={newSupplier.name}
        onChange={handleNewSupplierChange}
      />
      <input
        type="text"
        placeholder="Order ID"
        name="orderId"
        value={newSupplier.orderId}
        onChange={handleNewSupplierChange}
      />
      <input
        type="text"
        placeholder="Supplier Contact Number"
        name="contactNumber"
        value={newSupplier.contactNumber}
        onChange={handleNewSupplierChange}
      />
      <button type="submit">Add Supplier</button>
    </form>
  </div>
  <div className="admin-page__add-storage">
    <h2>Add New Storage</h2>
    <form onSubmit={handleAddNewStorage}>
      <input
        type="text"
        placeholder="Storage ID"
        name="id"
        value={newStorage.id}
        onChange={handleNewStorageChange}
      />
      <input
        type="text"
        placeholder="Location"
        name="location"
        value={newStorage.location}
        onChange={handleNewStorageChange}
      />
      <input
        type="text"
        placeholder="Quantity"
        name="quantity"
        value={newStorage.quantity}
        onChange={handleNewStorageChange}
      />
      <input
        type="text"
        placeholder="Product ID"
        name="productId"
        value={newStorage.productId}
        onChange={handleNewStorageChange}
      />
      <input
        type="text"
        placeholder="Contact Number"
        name="contactNumber"
        value={newStorage.contactNumber}
        onChange={handleNewStorageChange}
      />
      <button type="submit">Add Storage</button>
    </form>
  </div>
</div>

<div className='other-func'>
  <h2>Some other functionalities</h2>

  <button type="submit" onClick={showComp}>{isViewAllClicked ? "Hide Companies" : "View All Companies"}</button>
  {isViewAllClicked && (
    <table>
      <thead>
        <tr>
          <th>Company ID</th>
          <th>Company Name</th>
        </tr>
      </thead>
      <tbody>
        {companyList.map((val) => {
          return (
            <tr key={val.Company_id}>
              <td>{val.Company_id}</td>
              <td>{val.Name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )}

  <button type="submit" onClick={showSupp}>{isViewAllClickedsupp ? "Hide Supplier" : "View All Supplier"}</button>
  {isViewAllClickedsupp && (
    <table>
      <thead>
        <tr>
          <th>Supplier ID</th>
          <th>Supplier Name</th>
          <th>Order ID</th>
        </tr>
      </thead>
      <tbody>
        {supplierList.map((val) => {
          return (
            <tr key={val.supplier_id}>
              <td>{val.supplier_id}</td>
              <td>{val.Name}</td>
              <td>{val.order_id}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )}

  <button type="submit" onClick={showStorage}>{isViewAllClickedstorage ? "Hide Storage" : "View All Storage"}</button>
  {isViewAllClickedstorage && (
    <table>
      <thead>
        <tr>
          <th>Store ID</th>
          <th>Location</th>
          <th>Quantity</th>
          <th>Product ID</th>
        </tr>
      </thead>
      <tbody>
        {storageList.map((val) => {
          return (
            <tr key={val.Store_id}>
              <td>{val.Store_id}</td>
              <td>{val.Location}</td>
              <td>{val.Quantity}</td>
              <td>{val.Product_id}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )}
</div>


  </>
);
}
export default AdminPage;