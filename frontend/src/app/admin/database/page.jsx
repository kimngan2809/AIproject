"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { callAPI } from '@/utils/api-caller'; 
import { getToken, getUser } from '@/utils/helper'; 

const AdminDatabasePage = () => {
  const [selectedOption, setSelectedOption] = useState("user");
  const [isFetch, setIsFetch] = useState(false)
  const [staff, setStaff] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [error, setError] = useState(""); 
  const router = useRouter();
  
  const user = getUser();
  const token = getToken();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.replace('/');
    } else {
      fetchStaff(token);
      fetchCustomers(token);
    }
  }, [isFetch]);

  const fetchStaff = async (token) => {
    try {
      const response = await callAPI("/admin/staff", "GET");
      const users = response.data;
      setStaff(users.map(user => ({ ...user })));
    } catch (error) {
      setError("Failed to load staff.");
    }
  };

  const fetchCustomers = async (token) => {
    try {
      const response = await callAPI("/admin/customers", "GET");
      setCustomers(response.data.map(customer => ({ ...customer })));
    } catch (error) {
      setError("Failed to load customers.");
    }
  };

  const handleCheckboxChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleEditClick = (rowIndex) => {
    setEditingRow(rowIndex);
    setEditedData(selectedOption === "user" ? staff[rowIndex] : customers[rowIndex]);
  };

  const handleInputChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  const handleSaveClick = async () => {
    console.log('click')
    try {
      const token = getToken();
      const url = selectedOption === "user" ? `/admin/employee` : `/admin/customer`;

      await callAPI(url, "POST", { ...editedData, id: editedData._id, action: "edit" }, null, false, token);

      if (selectedOption === "user") {
        const updatedStaff = [...staff];
        updatedStaff[editingRow] = editedData;
        setStaff(updatedStaff);
      } else {
        const updatedCustomers = [...customers];
        updatedCustomers[editingRow] = editedData;
        setCustomers(updatedCustomers);
      }

      setEditingRow(null);
      setIsFetch(!isFetch)
    } catch (error) {
      setError("Failed to save changes.");
    }
  };

  const handleDeleteClick = async (id) => {
    const token = getToken();
    const url = selectedOption === "user" ? `/admin/employee` : `/admin/customer`;

    await callAPI(url, "POST", { id, action: "delete" }, null, false, token);

    if (selectedOption === "user") {
      setStaff(staff.filter((_, index) => index !== editingRow));
    } else {
      setCustomers(customers.filter((_, index) => index !== editingRow));
    }
    setEditingRow(null);
    setIsFetch(!isFetch)
  };

  return (
    <div style={{ padding: "80px 10px" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <div style={{ marginRight: "100px"}}>
          <input type="radio" value="user" checked={selectedOption === "user"} onChange={handleCheckboxChange} style={{ accentColor: "#458A55", marginRight: "10px"}} />
          <label style={{ fontSize: "20px", fontWeight: "bold", color: "#458A55" }}>User</label>
        </div>
        <div style={{ marginLeft: "50px" }}>
          <input type="radio" value="customer" checked={selectedOption === "customer"} onChange={handleCheckboxChange} style={{ accentColor: "#458A55", marginRight: "10px"}} />
          <label style={{ fontSize: "20px", fontWeight: "bold", color: "#458A55" }}>Customer</label>
        </div>
      </div>

      {selectedOption === "user" && (
        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", color: "#000", border: "2px solid #E49F15" }}>
          <thead>
            <tr style={{ backgroundColor: "#458A55", color: "#fff" }}>
              <th style={{ padding: "10px", border: "2px solid #E49F15" }}>ID Employee</th>
              <th style={{ padding: "10px", border: "2px solid #E49F15" }}>Name</th>
              <th style={{ padding: "10px", border: "2px solid #E49F15" }}>Email</th>
              <th style={{ padding: "10px", border: "2px solid #E49F15" }}>Phone Number</th>
              <th style={{ padding: "10px", border: "2px solid #E49F15" }}>Username</th>
              <th style={{ padding: "10px", border: "2px solid #E49F15" }}>Password</th>
              <th style={{ padding: "10px", border: "2px solid #E49F15" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px", fontSize: "16px" }}>No data available</td>
              </tr>
            ) : (
              staff.map((user, index) => (
                <tr key={index} style={{ backgroundColor: editingRow === index ? "#D9D9D9" : "transparent" }}>
                  <td style={{ padding: "10px", border: "2px solid #E49F15", width: "8%", textAlign: "center" }}>{user.idEmployee}</td>
                  <td style={{ padding: "10px", border: "2px solid #E49F15", width: "15%" }}>
                    {editingRow === index ? (
                      <input style={{width: "100%", border: "none", outline: "none", padding: "1px"}} type="text" value={editedData.name} onChange={(e) => handleInputChange(e, "name")} />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td style={{ padding: "10px", border: "2px solid #E49F15", width: "23%" }}>
                    {editingRow === index ? (
                      <input style={{width: "100%", border: "none", outline: "none", padding: "1px"}} type="text" value={editedData.email} onChange={(e) => handleInputChange(e, "email")} />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td style={{ padding: "10px", border: "2px solid #E49F15", width: "12%" }}>
                    {editingRow === index ? (
                      <input style={{width: "100%", border: "none", outline: "none", padding: "1px"}} type="text" value={editedData.phoneNumber} onChange={(e) => handleInputChange(e, "phoneNumber")} />
                    ) : (
                      user.phoneNumber
                    )}
                  </td>
                  <td style={{ padding: "10px", border: "2px solid #E49F15", width: "12%" }}>{user.username}</td>
                  <td style={{ padding: "10px", border: "2px solid #E49F15", width: "18%" }}>
                    {editingRow === index ? (
                      <input style={{width: "100%", border: "none", outline: "none", padding: "1px"}} type="text" value={editedData.password} onChange={(e) => handleInputChange(e, "password")} />
                    ) : (
                      '*********'
                    )}
                  </td>
                  <td style={{ padding: "10px", border: "2px solid #E49F15", width: "12%", textAlign: "center" }}>
                    {editingRow === index ? (
                      <>
                        <button type="button" onClick={() => setEditingRow(null)} style={{ backgroundColor: "#458A55", color: "#fff", borderRadius: "5px", padding: "5px 10px", marginRight: "5px" }}>Cancel</button>
                        <button type="button" onClick={() => handleSaveClick()} style={{ backgroundColor: "#458A55", color: "#fff", borderRadius: "5px", padding: "5px 10px" }}>Save</button>
                      </>
                    ) : (
                      <>
                        <button type="button" onClick={() => handleEditClick(index)} style={{ backgroundColor: "#458A55", color: "#fff", borderRadius: "5px", padding: "5px 10px", marginRight: "5px" }}>Edit</button>
                        <button type="button" onClick={() => handleDeleteClick(user._id)} style={{ backgroundColor: "#458A55", color: "#fff", borderRadius: "5px", padding: "5px 10px" }}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {selectedOption === "customer" && (
        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", color: "#000", border: "2px solid #E49F15" }}>
          <thead>
            <tr style={{ backgroundColor: "#458A55", color: "#fff" }}>
              <th style={{ padding: "10px", border: "2px solid #E49F15" }}>ID Customer</th>
              <th style={{ padding: "10px", border: "2px solid #E49F15" }}>Name</th>
              <th style={{ padding: "10px", border: "2px solid #E49F15" }}>Phone Number</th>
              <th style={{ padding: "10px", border: "2px solid #E49F15" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "20px", fontSize: "16px" }}>No data available</td>
              </tr>
            ) : (
              customers.map((customer, index) => (
                <tr key={index} style={{ backgroundColor: editingRow === index ? "#D9D9D9" : "transparent" }}>
                  <td style={{ padding: "10px", border: "2px solid #E49F15", width: "10%", textAlign: "center" }}>{customer.customerId}</td>
                  <td style={{ padding: "10px", border: "2px solid #E49F15", width: "40%" }}>
                    {editingRow === index ? (
                      <input style={{width: "100%", border: "none", outline: "none", padding: "1px"}} type="text" value={editedData.name} onChange={(e) => handleInputChange(e, "name")} />
                    ) : (
                      customer.name
                    )}
                  </td>
                  <td style={{ padding: "10px", border: "2px solid #E49F15", width: "35%" }}>
                    {editingRow === index ? (
                      <input style={{width: "100%", border: "none", outline: "none", padding: "1px"}} type="text" value={editedData.phoneNumber} onChange={(e) => handleInputChange(e, "phoneNumber")} />
                    ) : (
                      customer.phoneNumber
                    )}
                  </td>
                  <td style={{ padding: "10px", border: "2px solid #E49F15", textAlign: "center", width: "15%" }}>
                    {editingRow === index ? (
                      <>
                        <button type="button" onClick={() => setEditingRow(null)} style={{ backgroundColor: "#458A55", color: "#fff", borderRadius: "5px", padding: "5px 10px", marginRight: "5px" }}>Cancel</button>
                        <button type="button" onClick={() => handleSaveClick()} style={{ backgroundColor: "#458A55", color: "#fff", borderRadius: "5px", padding: "5px 10px" }}>Save</button>
                      </>
                    ) : (
                      <>
                        <button type="button" onClick={() => handleEditClick(index)} style={{ backgroundColor: "#458A55", color: "#fff", borderRadius: "5px", padding: "5px 10px", marginRight: "5px" }}>Edit</button>
                        <button type="button" onClick={() => handleDeleteClick(customer._id)} style={{ backgroundColor: "#458A55", color: "#fff", borderRadius: "5px", padding: "5px 10px" }}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDatabasePage;
