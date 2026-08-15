import React, { useState, useEffect } from 'react';
import './ShoppingPage.css';
import ProductList from '../components/ProductList';
import CartModal from '../components/CartModal';
import CheckoutModal from '../components/CheckoutModal';
import { Container, Row, Col, Form, InputGroup, Button, Badge } from 'react-bootstrap';
import { FaSearch, FaShoppingBag, FaTruck, FaMedkit, FaShieldAlt } from 'react-icons/fa';

const categories = ['All', 'Arishtam', 'Choornam', 'Ghritam', 'Thailam', 'Tablets'];

const ShoppingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart state initialization with localStorage persistence
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('medicine_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [showCartModal, setShowCartModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('medicine_cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (medicine) => {
    const medId = medicine._id || medicine.id;
    setCart((prevCart) => {
      const existing = prevCart.find((item) => (item._id || item.id) === medId);
      if (existing) {
        return prevCart.map((item) =>
          (item._id || item.id) === medId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...medicine, quantity: 1 }];
    });
  };

  const handleBuyNow = (medicine) => {
    handleAddToCart(medicine);
    setShowCartModal(true);
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeItem(id);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          (item._id || item.id) === id ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => (item._id || item.id) !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((count, i) => count + i.quantity, 0);

  return (
    <div className="shoppingpage">
      {/* Hero Banner */}
      <div className="shopping-hero bg-success text-white py-4 mb-4">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h2 className="font-weight-bold d-flex align-items-center mb-2">
                <FaMedkit className="mr-2" /> Ayurvedic Medicine Delivery
              </h2>
              <p className="lead mb-0">
                Order genuine Ayurvedic medicines online. Direct home delivery to your doorstep.
              </p>
            </Col>
            <Col md={4} className="text-md-right mt-3 mt-md-0">
              <Button
                variant="light"
                size="lg"
                className="position-relative text-success font-weight-bold shadow-sm"
                onClick={() => setShowCartModal(true)}
              >
                <FaShoppingBag className="mr-2" /> View Cart
                {totalCartCount > 0 && (
                  <Badge variant="danger" pill className="ml-2">
                    {totalCartCount}
                  </Badge>
                )}
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        {/* Features Highlights */}
        <Row className="mb-4 text-center">
          <Col md={4} className="mb-2">
            <div className="p-3 bg-white rounded border shadow-sm d-flex align-items-center justify-content-center">
              <FaTruck className="text-success mr-3" size={24} />
              <span className="font-weight-bold text-dark">Fast Doorstep Delivery</span>
            </div>
          </Col>
          <Col md={4} className="mb-2">
            <div className="p-3 bg-white rounded border shadow-sm d-flex align-items-center justify-content-center">
              <FaShieldAlt className="text-success mr-3" size={24} />
              <span className="font-weight-bold text-dark">100% Authentic Medicines</span>
            </div>
          </Col>
          <Col md={4} className="mb-2">
            <div className="p-3 bg-white rounded border shadow-sm d-flex align-items-center justify-content-center">
              <FaMedkit className="text-success mr-3" size={24} />
              <span className="font-weight-bold text-dark">Doctor Consultation Supported</span>
            </div>
          </Col>
        </Row>

        {/* Search & Category Filter Bar */}
        <div className="shopping-filter-bar p-3 bg-white rounded border shadow-sm mb-4">
          <Row className="align-items-center">
            <Col lg={5} className="mb-3 mb-lg-0">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text className="bg-light">
                    <FaSearch className="text-muted" />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Search medicine by name (e.g. Abhayarishtam, Brahmi)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
            </Col>

            <Col lg={7}>
              <div className="d-flex flex-wrap align-items-center justify-content-lg-end gap-2">
                <span className="font-weight-bold text-muted mr-2">Categories:</span>
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? 'success' : 'outline-secondary'}
                    size="sm"
                    className="mr-1 mb-1 rounded-pill"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </div>

        {/* Medicine Product Grid */}
        <ProductList
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      </Container>

      {/* Floating Cart Button for Mobile */}
      {totalCartCount > 0 && (
        <div className="floating-cart-btn d-md-none position-fixed" style={{ bottom: '20px', right: '20px', zIndex: 1000 }}>
          <Button
            variant="success"
            size="lg"
            className="rounded-circle p-3 shadow-lg"
            onClick={() => setShowCartModal(true)}
          >
            <FaShoppingBag size={24} />
            <Badge variant="danger" pill className="position-absolute" style={{ top: '-5px', right: '-5px' }}>
              {totalCartCount}
            </Badge>
          </Button>
        </div>
      )}

      {/* Cart & Checkout Modals */}
      <CartModal
        show={showCartModal}
        handleClose={() => setShowCartModal(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        openCheckout={() => setShowCheckoutModal(true)}
      />

      <CheckoutModal
        show={showCheckoutModal}
        handleClose={() => setShowCheckoutModal(false)}
        cart={cart}
        clearCart={clearCart}
      />
    </div>
  );
};

export default ShoppingPage;
