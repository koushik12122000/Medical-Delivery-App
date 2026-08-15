import React from 'react';
import './MedicineShop.css';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaPhoneAlt, FaTruck } from 'react-icons/fa';

const MedicineShop = ({ handleCloseMed, showMed }) => {
    return (
        <Modal show={showMed} onHide={handleCloseMed} centered className="medicine-shop-modal">
            <Modal.Header closeButton className="bg-success text-white">
                <Modal.Title className="d-flex align-items-center">
                    <FaTruck className="mr-2" /> Ayurvedic Medicine Delivery
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center p-4">
                <h4 className="text-success font-weight-bold mb-3">Order Medicines Online or Phone</h4>
                <p className="text-secondary mb-4">
                    Explore our complete Ayurvedic medicine catalog online with doorstep delivery, or speak directly with our clinic pharmacy.
                </p>

                <div className="bg-light p-3 rounded mb-4 border">
                    <p className="mb-1 font-weight-bold text-dark d-flex align-items-center justify-content-center">
                        <FaPhoneAlt className="text-success mr-2" /> Helpline / Phone Order:
                    </p>
                    <a href="tel:+919740476241" className="h4 text-success font-weight-bold">
                        +91 9740476241
                    </a>
                </div>

                <Link to="/shop" onClick={handleCloseMed}>
                    <Button variant="success" size="lg" block className="font-weight-bold">
                        <FaShoppingBag className="mr-2" /> Open Online Medicine Shop
                    </Button>
                </Link>
            </Modal.Body>
        </Modal>
    );
};

export default MedicineShop;
