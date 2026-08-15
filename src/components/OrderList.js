import React, { useState, useEffect } from 'react';
import { Table, Badge, Form, Spinner, Alert } from 'react-bootstrap';
import backend from '../axios';
import './OrderList.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [updateMsg, setUpdateMsg] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await backend.get('/api/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await backend.patch(`/api/orders/${orderId}`, { status: newStatus });
      setUpdateMsg(`Order status updated to ${newStatus}`);
      fetchOrders();
      setTimeout(() => setUpdateMsg(''), 3000);
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const filteredOrders = filterStatus === 'All'
    ? orders
    : orders.filter(o => o.status === filterStatus);

  const getBadgeVariant = (status) => {
    switch (status) {
      case 'Pending': return 'warning';
      case 'Out for Delivery': return 'info';
      case 'Delivered': return 'success';
      case 'Cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div className="order-list-container p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-success font-weight-bold mb-0">Medicine Delivery Orders</h3>
        <Form.Group className="mb-0 d-flex align-items-center">
          <Form.Label className="mr-2 mb-0 font-weight-bold">Filter Status:</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ width: '180px' }}
          >
            <option value="All">All Orders ({orders.length})</option>
            <option value="Pending">Pending</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </Form.Control>
        </Form.Group>
      </div>

      {updateMsg && <Alert variant="success" className="py-2">{updateMsg}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="success" />
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <h5>No medicine delivery orders found.</h5>
        </div>
      ) : (
        <Table responsive striped bordered hover className="order-table bg-white">
          <thead className="bg-success text-white">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Address & PIN</th>
              <th>Medicines Ordered</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>
                  <strong className="text-uppercase">#{order._id.slice(-6)}</strong>
                  <div className="small text-muted">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td>
                  <strong className="d-block">{order.customerName}</strong>
                  <span className="small text-muted">📞 {order.phone}</span>
                </td>
                <td>
                  <div>{order.address}</div>
                  <Badge variant="secondary">PIN: {order.zip}</Badge>
                </td>
                <td>
                  <ul className="mb-0 pl-3 small">
                    {order.items.map((it, idx) => (
                      <li key={idx}>
                        {it.name} (x{it.quantity})
                      </li>
                    ))}
                  </ul>
                  {order.notes && (
                    <div className="small text-italic text-info mt-1">
                      Note: "{order.notes}"
                    </div>
                  )}
                </td>
                <td className="font-weight-bold text-success">₹{order.totalAmount}</td>
                <td>
                  <Badge variant={getBadgeVariant(order.status)}>
                    {order.status}
                  </Badge>
                </td>
                <td>
                  <Form.Control
                    as="select"
                    size="sm"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </Form.Control>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default OrderList;
