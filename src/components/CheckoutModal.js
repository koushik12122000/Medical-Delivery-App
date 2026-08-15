import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import backend from '../axios';
import './CheckoutModal.css';

const CheckoutModal = ({ show, handleClose, cart, clearCart }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    zip: '',
    notes: '',
    paymentMethod: 'Cash on Delivery'
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(null);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 50;
  const totalAmount = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const orderPayload = {
      ...formData,
      items: cart.map(i => ({
        medicineId: i._id || i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity
      })),
      totalAmount
    };

    try {
      const response = await backend.post('/api/orders', orderPayload);
      setOrderSuccess(response.data.order);
      clearCart();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setErrorMsg(err.response.data.error);
      } else {
        setErrorMsg('Failed to place order. Please check PIN code and details.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setOrderSuccess(null);
    setErrorMsg('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} size="lg" centered className="checkout-modal">
      <Modal.Header closeButton className="bg-success text-white">
        <Modal.Title>Medicine Delivery Checkout</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        {orderSuccess ? (
          <div className="text-center py-4">
            <FaCheckCircle size={65} color="#28a745" className="mb-3" />
            <h3 className="text-success font-weight-bold">Order Placed Successfully!</h3>
            <p className="lead">Order ID: <strong>#{orderSuccess._id.slice(-6).toUpperCase()}</strong></p>
            <p className="text-muted">
              Thank you, <strong>{orderSuccess.customerName}</strong>. Your medicines will be delivered to <strong>{orderSuccess.address} (PIN: {orderSuccess.zip})</strong> within 24-48 hours.
            </p>
            <div className="bg-light p-3 rounded mb-3 text-left">
              <strong>Order Details:</strong>
              <ul className="mb-0 mt-2">
                {orderSuccess.items.map((it, idx) => (
                  <li key={idx}>
                    {it.name} x {it.quantity} — ₹{it.price * it.quantity}
                  </li>
                ))}
              </ul>
              <hr />
              <div className="d-flex justify-content-between font-weight-bold">
                <span>Total Amount ({orderSuccess.paymentMethod}):</span>
                <span className="text-success">₹{orderSuccess.totalAmount}</span>
              </div>
            </div>
            <Button variant="success" size="lg" onClick={handleModalClose}>
              Back to Medicine Shop
            </Button>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            {errorMsg && (
              <Alert variant="danger" className="d-flex align-items-center">
                <FaExclamationTriangle className="mr-2" /> {errorMsg}
              </Alert>
            )}

            <h5 className="border-bottom pb-2 mb-3 text-success font-weight-bold">Patient & Delivery Information</h5>

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="customerName"
                    placeholder="Enter patient full name"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Phone Number *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email Address *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Delivery PIN Code *</Form.Label>
                  <Form.Control
                    type="number"
                    name="zip"
                    placeholder="e.g. 560001 or 682001"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    Supported test PINs: 560001, 560034, 560066, 682001, 110001
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group>
              <Form.Label>Full Delivery Address *</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="address"
                placeholder="House No, Street name, Area, City, Landmark"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Prescription Note / Special Instructions (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="notes"
                placeholder="Specify doctor recommendation, dosage instructions, or preferred delivery timing"
                value={formData.notes}
                onChange={handleChange}
              />
            </Form.Group>

            <h5 className="border-bottom pb-2 my-3 text-success font-weight-bold">Payment Method</h5>
            <Form.Group>
              <Form.Check
                type="radio"
                label="Cash / Pay on Delivery (COD)"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={formData.paymentMethod === 'Cash on Delivery'}
                onChange={handleChange}
                id="cod"
                className="mb-2"
              />
              <Form.Check
                type="radio"
                label="UPI / GPay / PhonePe / Card (Pay at doorstep)"
                name="paymentMethod"
                value="Online / Doorstep UPI"
                checked={formData.paymentMethod === 'Online / Doorstep UPI'}
                onChange={handleChange}
                id="online"
              />
            </Form.Group>

            <div className="bg-light p-3 rounded mb-3">
              <div className="d-flex justify-content-between font-weight-bold h5 mb-0">
                <span>Total Delivery Amount:</span>
                <span className="text-success">₹{totalAmount}</span>
              </div>
            </div>

            <Button
              variant="success"
              size="lg"
              type="submit"
              block
              disabled={loading || cart.length === 0}
            >
              {loading ? <Spinner animation="border" size="sm" /> : `Confirm & Order Medicines (₹${totalAmount})`}
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CheckoutModal;
