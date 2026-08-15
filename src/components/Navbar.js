import React from 'react';
import { Link } from 'react-router-dom';
import { FaCapsules, FaPhoneAlt, FaUserShield, FaCalendarCheck } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar__container shadow-sm">
            <div className="top-banner bg-success text-white py-1 px-3 d-flex justify-content-between align-items-center small">
                <div>
                    🚀 <strong>Fast Doorstep Medicine Delivery</strong> | Express dispatch within 24 hours
                </div>
                <div className="d-flex align-items-center">
                    <FaPhoneAlt className="mr-1" /> Delivery Helpline: <strong>+91 97404 76241</strong>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 py-3">
                <Link to="/" className="navbar-brand d-flex align-items-center font-weight-bold text-success">
                    <FaCapsules size={28} className="mr-2" />
                    <div>
                        <span className="h4 mb-0 font-weight-bold">AyurMed Express</span>
                        <div className="small text-muted font-weight-normal" style={{ fontSize: '0.75rem' }}>
                            Online Medicine Delivery & Pharmacy
                        </div>
                    </div>
                </Link>

                <div className="ml-auto d-flex align-items-center gap-3">
                    <Link to="/" className="btn btn-outline-success btn-sm font-weight-bold mr-2">
                        <FaCapsules className="mr-1" /> Medicines Store
                    </Link>
                    <Link to="/book_appointment" className="btn btn-outline-primary btn-sm font-weight-bold mr-2">
                        <FaCalendarCheck className="mr-1" /> Doctor Consultation
                    </Link>
                    <Link to="/admin" className="btn btn-success btn-sm font-weight-bold">
                        <FaUserShield className="mr-1" /> Admin & Orders
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
