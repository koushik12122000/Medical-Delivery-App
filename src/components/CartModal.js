import React, { useState } from 'react';
import { Modal, Button, Table, Form, InputGroup } from 'react-bootstrap';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaTruck } from 'react-icons/fa';
import './CartModal.css';

const CartModal = ({ show, handleClose, cart, updateQuantity, removeItem, openCheckout }) => {
  const [zipInput, setZipInput] = useState('');
  const [zipVerified, setZipVerified] = useState(null);
  const [zipMsg, setZipMsg] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 50;
  const total = subtotal + shipping;

  const checkDeliveryZip = async () => {
    if (!zipInput.trim()) return;
    try {
      const res = await fetch(`http://localhost:5000/api/zip`);
      const availableZips = await res.json();
      if (availableZips.includes(zipInput.trim())) {
        setZipVerified(true);
        setZipMsg('🎉 Great news! Medicine delivery is available in your area.');
      } else {
        setZipVerified(false);
        setZipMsg('❌ Delivery is not yet available at this PIN Code. (Try 560001, 560034, 682001, 110001)');
      }
    } catch (err) {
      setZipVerified(false);
      setZipMsg('Could not verify PIN code. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered className="cart-modal">
      <Modal.Header closeButton className="bg-success text-white">
        <Modal.Title className="d-flex align-items-center">
          <FaShoppingBag className="mr-2" /> Your Medicine Delivery Cart ({cart.reduce((count, i) => count + i.quantity, 0)} items)
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="cart-modal-body">
        {cart.length === 0 ? (
          <div className="text-center py-5">
            <FaShoppingBag size={50} color="#ccc" className="mb-3" />
            <h4 className="text-muted">Your medicine cart is empty</h4>
            <p className="text-secondary">Explore our authentic Ayurvedic medicine catalog and add medicines to order.</p>
          </div>
        ) : (
          <>
            <div className="cart-delivery-checker p-3 mb-3 bg-light rounded border">
              <Form.Label className="font-weight-bold d-flex align-items-center">
                <FaTruck className="mr-2 text-success" /> Check Medicine Delivery Availability
              </Form.Label>
              <InputGroup size="sm">
                <Form.Control
                  type="number"
                  placeholder="Enter 6-digit PIN code (e.g. 560001)"
                  value={zipInput}
                  onChange={(e) => setZipInput(e.target.value)}
                />
                <InputGroup.Append>
                  <Button variant="outline-success" onClick={checkDeliveryZip}>
                    Verify PIN
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              {zipMsg && (
                <div className={`mt-2 small ${zipVerified ? 'text-success font-weight-bold' : 'text-danger'}`}>
                  {zipMsg}
                </div>
              )}
            </div>

            <Table responsive borderless hover align="middle" className="cart-table">
              <thead>
                <tr className="border-bottom">
                  <th>Medicine</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id || item.id} className="border-bottom">
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.img || 'https://via.placeholder.com/60'}
                          alt={item.name}
                          className="rounded mr-3 cart-item-img"
                        />
                        <div>
                          <strong className="d-block text-dark">{item.name}</strong>
                          <span className="badge badge-info">{item.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="font-weight-bold">₹{item.price}</td>
                    <td>
                      <div className="d-flex align-items-center cart-qty-controls">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                        >
                          <FaMinus size={10} />
                        </Button>
                        <span className="mx-2 font-weight-bold">{item.quantity}</span>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                        >
                          <FaPlus size={10} />
                        </Button>
                      </div>
                    </td>
                    <td className="font-weight-bold text-success">₹{item.price * item.quantity}</td>
                    <td>
                      <Button
                        variant="light"
                        size="sm"
                        className="text-danger border-0"
                        onClick={() => removeItem(item._id || item.id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="cart-summary bg-light p-3 rounded">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <strong className="text-dark">₹{subtotal}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Delivery Fee:</span>
                <strong className={shipping === 0 ? 'text-success' : 'text-dark'}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </strong>
              </div>
              {shipping > 0 && (
                <div className="small text-muted mb-2">💡 Add ₹{500 - subtotal} more for FREE home delivery</div>
              )}
              <hr />
              <div className="d-flex justify-content-between text-dark h5 mb-0">
                <strong>Total Amount:</strong>
                <strong className="text-success">₹{total}</strong>
              </div>
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="outline-secondary" onClick={handleClose}>
          Continue Shopping
        </Button>
        {cart.length > 0 && (
          <Button
            variant="success"
            size="lg"
            onClick={() => {
              handleClose();
              openCheckout();
            }}
          >
            Proceed to Delivery Checkout (₹{total})
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
