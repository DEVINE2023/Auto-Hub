import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api/customerApi';

interface Vehicle {
  vehicleNumber: string;
  make: string;
  model: string;
  year: number;
}

const CustomerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await api.get(`/customers/${id}`);
        setCustomer(response.data);
      } catch (error) {
        console.error('Error fetching customer:', error);
        alert('Customer not found or error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCustomer();
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!customer) {
    return <div className="container mt-5">Customer not found.</div>;
  }

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/')}>
        ← Back to Customer List
      </button>

      <div className="card shadow">
        <div className="card-header bg-info text-white">
          <h4>Customer Details</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h5>Personal Information</h5>
              <p><strong>Name:</strong> {customer.name}</p>
              <p><strong>Phone:</strong> {customer.phone}</p>
              <p><strong>Email:</strong> {customer.email || 'N/A'}</p>
              <p><strong>Address:</strong> {customer.address || 'N/A'}</p>
              <p><strong>Registered On:</strong> {new Date(customer.registrationDate).toLocaleDateString()}</p>
            </div>

            <div className="col-md-6">
              <h5>Vehicle Information</h5>
              {customer.vehicles && customer.vehicles.length > 0 ? (
                <ul className="list-group">
                  {customer.vehicles.map((vehicle: Vehicle, index: number) => (
                    <li key={index} className="list-group-item">
                      <strong>{vehicle.vehicleNumber}</strong> — {vehicle.make} {vehicle.model} ({vehicle.year})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No vehicle information available.</p>
              )}
            </div>
          </div>

          <hr />

          <h5>Purchase & Service History</h5>
          {customer.purchaseHistory && customer.purchaseHistory.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount (NPR)</th>
                </tr>
              </thead>
              <tbody>
                {customer.purchaseHistory.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td>{item.description}</td>
                    <td>{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No purchase history available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;