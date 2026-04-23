import React, { useState } from 'react';
import { api } from '../api/customerApi';
import { useNavigate } from 'react-router-dom';

const CustomerForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    vehicleNumber: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email || null,
      address: formData.address || null,
      vehicles: [
        {
          vehicleNumber: formData.vehicleNumber,
          make: formData.make,
          model: formData.model,
          year: parseInt(formData.year.toString()),
        },
      ],
    };

    try {
      await api.post('/customers', payload);
      alert('Customer registered successfully!');
      navigate('/');
    } catch (error) {
      alert('Failed to register customer. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>Register New Customer + Vehicle</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Customer Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <hr />
              <h5>Vehicle Information</h5>

              <div className="col-md-3">
                <label className="form-label">Vehicle Number *</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  className="form-control"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Make *</label>
                <input
                  type="text"
                  name="make"
                  className="form-control"
                  value={formData.make}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Model *</label>
                <input
                  type="text"
                  name="model"
                  className="form-control"
                  value={formData.model}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Year *</label>
                <input
                  type="number"
                  name="year"
                  className="form-control"
                  value={formData.year}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-success btn-lg"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register Customer'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;