import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const data = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(data);
  };

  const deleteUser = (id) => {
    const filtered = users.filter((u) => u.id !== id);
    localStorage.setItem("users", JSON.stringify(filtered));
    setUsers(filtered);
  };

  const updateUser = () => {
    const updated = users.map((u) =>
      u.id === editUser.id ? editUser : u
    );
    localStorage.setItem("users", JSON.stringify(updated));
    setUsers(updated);
    setEditUser(null);
  };

  return (
   <>
    <div className="d-flex">
      {/* Sidebar */}
     

      {/* Main */}
      <div className="flex-grow-1 p-4">
        <h2>Users</h2>

        {editUser && (
          <div className="card p-3 mb-3">
            <h5>Edit User</h5>
            <input
              className="form-control mb-2"
              value={editUser.name}
              onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              value={editUser.password}
              onChange={(e) =>
                setEditUser({ ...editUser, password: e.target.value })
              }
            />
            <button className="btn btn-success me-2" onClick={updateUser}>
              Update
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setEditUser(null)}
            >
              Cancel
            </button>
          </div>
        )}

        <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.password}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => setEditUser(u)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
   </>
  );
};

export default Users;
  