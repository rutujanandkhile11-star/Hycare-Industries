import { useState } from "react";

const RegisterUser = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const old = JSON.parse(localStorage.getItem("registrations")) || [];
    localStorage.setItem("registrations", JSON.stringify([...old, form]));
    alert("Registered!");
    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <div className="card p-4">
      <h4>User Registration</h4>
      <form onSubmit={handleSubmit} className="col-md-6">
        <input className="form-control mb-3" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input className="form-control mb-3" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input className="form-control mb-3" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default RegisterUser;
