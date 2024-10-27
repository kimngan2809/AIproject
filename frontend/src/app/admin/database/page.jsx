"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { callAPI } from '@/utils/api-caller'; 
import { getToken, getUser } from '@/utils/helper'; 

const AdminDatabasePage = () => {
  const [selectedOption, setSelectedOption] = useState("user"); // Mặc định chọn user
  const [staff, setStaff] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [editingRow, setEditingRow] = useState(null); // Để theo dõi hàng đang được chỉnh sửa
  const [editedData, setEditedData] = useState({});
  const [error, setError] = useState(""); 
  const router = useRouter();
  
  const user = getUser();
  const token = getToken();

  // Kiểm tra xem người dùng có quyền admin không
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.replace('/'); // Chuyển hướng nếu không phải admin
    } else {
      fetchStaff(token);
      fetchCustomers(token);
    }
  }, [user, token]);

  const fetchStaff = async (token) => {
    try {
      const response = await callAPI("/admin/staff", "GET");
      setStaff(response?.data || []); // Đảm bảo `data` tồn tại hoặc là mảng rỗng
    } catch (error) {
      setError("Failed to load staff.");
    }
};

const fetchCustomers = async (token) => {
    try {
      const response = await callAPI("/admin/customers", "GET");
      setCustomers(response?.data || []);
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
    const token = getToken();
    try {
      const url = selectedOption === "user" ? `/admin/employee` : `/admin/customer`;
      await callAPI(url, "POST", editedData, token);

      // Update the respective list with the edited data
      if (selectedOption === "user") {
        const updatedStaff = [...staff];
        updatedStaff[editingRow] = editedData;
        setStaff(updatedStaff);
      } else {
        const updatedCustomers = [...customers];
        updatedCustomers[editingRow] = editedData;
        setCustomers(updatedCustomers);
      }

      setEditingRow(null); // Dừng việc chỉnh sửa
    } catch (error) {
      setError("Failed to save changes.");
    }
  };

  const handleDeleteClick = async (id) => {
    const token = getToken();
    const url = selectedOption === "user" ? `/admin/employee` : `/admin/customer`;
    await callAPI(url, "POST", { id, action: "delete" }, token);

    if (selectedOption === "user") {
      setStaff(staff.filter((_, index) => index !== editingRow));
    } else {
      setCustomers(customers.filter((_, index) => index !== editingRow));
    }
    setEditingRow(null); // Hủy chỉnh sửa nếu đang chỉnh sửa
  };

  if (!user || user.role !== 'admin') {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2>Unauthorized Access</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "80px 10px" }}>
      {/* Checkbox chọn giữa User và Customer */}
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

      {/* Nút Save khi đang chỉnh sửa */}
      {editingRow !== null && (
        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <button onClick={handleSaveClick} style={{ backgroundColor: "#458A55", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer" }}>
            Save
          </button>
        </div>
      )}

      {/* Bảng hiển thị User */}
      {selectedOption === "user" && (
        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", color: "#000", border: "2px solid #E49F15" }}>
          <thead>
            <tr style={{ backgroundColor: "#458A55", color: "#fff" }}>
              <th style={{ padding: "10px", border: "2px solid #E49F15" }}>ID Employee</th>
              <th style={{ padding: "10px", border: "2px solid #E49F15" }}> Name</th>
              <th style={{ padding: "10px", border: "2px solid #E49F15" }}>Email</th>
              <th style={{ padding: "10px", border: "2px solid #E49F15" }}>Phone Number</th>
              <th style={{ padding: "10px", border: "2px solid #E49F15" }}>Username</th>
              <th style={{ padding: "10px", border: "2px solid #E49F15" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "20px", fontSize: "16px" }}>No data available</td>
              </tr>
            ) : (
              staff.map((user, index) => (
                <tr key={index} style={{ backgroundColor: editingRow === index ? "#D9D9D9" : "transparent" }}>
                  <td style={{ padding: "10px", border: "2px solid #E49F15" }}>{user.idEmployee}</td>
                  
                  <td style={{ padding: "10px", border: "2px solid #E49F15" }}>
                    {editingRow === index ? (
                      <input type="text" value={editedData.lastName} onChange={(e) => handleInputChange(e, "Name")} />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td style={{ padding: "10px", border: "2px solid #E49F15" }}>
                    {editingRow === index ? (
                      <input type="text" value={editedData.email} onChange={(e) => handleInputChange(e, "email")} />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td style={{ padding: "10px", border: "2px solid #E49F15" }}>
                    {editingRow === index ? (
                      <input type="text" value={editedData.phoneNumber} onChange={(e) => handleInputChange(e, "phoneNumber")} />
                    ) : (
                      user.phoneNumber
                    )}
                  </td>
                  <td style={{ padding: "10px", border: "2px solid #E49F15" }}>{user.username}</td>
                  <td style={{ padding: "10px", border: "2px solid #E49F15" }}>
                    {editingRow === index ? (
                      <button onClick={() => setEditingRow(null)} style={{ backgroundColor: "#458A55", color: "#fff", borderRadius: "5px", padding: "5px 10px", marginRight: "5px" }}>Cancel</button>
                    ) : (
                      <button onClick={() => handleEditClick(index)} style={{ backgroundColor: "#458A55", color: "#fff", borderRadius: "5px", padding: "5px 10px", marginRight: "5px" }}>Edit</button>
                    )}
                    <button onClick={() => handleDeleteClick(user.id)} style={{ backgroundColor: "#458A55", color: "#fff", borderRadius: "5px", padding: "5px 10px" }}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Tương tự cho bảng Customer */}
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
                <td colSpan="7" style={{ textAlign: "center", padding: "20px", fontSize: "16px" }}>No data available</td>
              </tr>
            ) : (
              customers.map((customer, index) => (
                <tr key={index} style={{ backgroundColor: editingRow === index ? "#D9D9D9" : "transparent" }}>
                  <td style={{ padding: "10px", border: "2px solid #E49F15" }}>{customer.customerId}</td>
                  <td style={{ padding: "10px", border: "2px solid #E49F15" }}>
                    {editingRow === index ? (
                      <input type="text" value={editedData.lastName} onChange={(e) => handleInputChange(e, "Name")} />
                    ) : (
                      customer.name
                    )}
                  </td>
                  <td style={{ padding: "10px", border: "2px solid #E49F15" }}>
                    {editingRow === index ? (
                      <input type="text" value={editedData.phoneNumber} onChange={(e) => handleInputChange(e, "phoneNumber")} />
                    ) : (
                      customer.phoneNumber
                    )}
                  </td>
                  <td style={{ padding: "10px", border: "2px solid #E49F15" }}>
                    {editingRow === index ? (
                      <button onClick={() => setEditingRow(null)} style={{ backgroundColor: "#458A55", color: "#fff", borderRadius: "5px", padding: "5px 10px", marginRight: "5px" }}>Cancel</button>
                    ) : (
                      <button onClick={() => handleEditClick(index)} style={{ backgroundColor: "#458A55", color: "#fff", borderRadius: "5px", padding: "5px 10px", marginRight: "5px" }}>Edit</button>
                    )}
                    <button onClick={() => handleDeleteClick(customer.id)} style={{ backgroundColor: "#458A55", color: "#fff", borderRadius: "5px", padding: "5px 10px" }}>Delete</button>
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
