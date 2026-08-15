import React from 'react';
import './Footer.css';
import { Container, Row, Col } from 'react-bootstrap';
import { FaCapsules, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaTruck, FaShieldAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <Container>
        <Row className="mb-4">
          <Col lg={4} md={6} className="mb-4">
            <h4 className="text-success font-weight-bold d-flex align-items-center mb-3">
              <FaCapsules className="mr-2" /> AyurMed Express
            </h4>
            <p className="text-secondary">
              Your trusted online Ayurvedic medicine delivery platform. We provide 100% authentic medicines delivered straight to your home with express shipping and expert guidance.
            </p>
          </Col>

          <Col lg={4} md={6} className="mb-4">
            <h5 className="text-light font-weight-bold mb-3">Delivery Features</h5>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2"><FaTruck className="text-success mr-2" /> Fast 24-48 Hour Doorstep Delivery</li>
              <li className="mb-2"><FaShieldAlt className="text-success mr-2" /> 100% Genuine Certified Medicines</li>
              <li className="mb-2">💳 Cash on Delivery & Doorstep UPI</li>
              <li className="mb-2">📋 Prescription Upload Supported</li>
            </ul>
          </Col>

          <Col lg={4} md={12} className="mb-4">
            <h5 className="text-light font-weight-bold mb-3">Pharmacy Helpline & Support</h5>
            <p className="text-secondary mb-2">
              <FaMapMarkerAlt className="text-success mr-2" /> Yelahanka New Town, Bangalore
            </p>
            <p className="text-secondary mb-2">
              <FaPhoneAlt className="text-success mr-2" /> Phone: +91 97404 76241
            </p>
            <p className="text-secondary mb-2">
              <FaEnvelope className="text-success mr-2" /> Email: support@ayurmedexpress.com
            </p>
          </Col>
        </Row>
        <hr className="border-secondary" />
        <Row>
          <Col className="text-center text-secondary small">
            © {new Date().getFullYear()} AyurMed Express Medicine Delivery Platform. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
