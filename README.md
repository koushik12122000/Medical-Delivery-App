# Medical Delivery App

A full-stack web application designed to simplify the process of ordering and delivering medicines online. The platform enables users to browse medicines, place orders, manage prescriptions, and track deliveries through an intuitive interface.

---

## Overview

Medical Delivery App is an end-to-end healthcare delivery solution that connects customers with pharmacies and delivery personnel. The application streamlines medicine ordering, improves accessibility, and provides a convenient way for users to receive essential medications at their doorstep.

---

## Features

### Customer Features

- User Registration and Login
- Browse Medicines
- Search Medicines by Name
- Add Medicines to Cart
- Secure Checkout Process
- Order Tracking
- Prescription Upload Support
- Order History Management

### Pharmacy Features

- Manage Medicine Inventory
- Update Medicine Availability
- Process Customer Orders
- View Delivery Requests

### Delivery Features

- View Assigned Deliveries
- Update Delivery Status
- Real-Time Order Tracking

---

## Tech Stack

### Frontend

- React.js
- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js

### Database

- MongoDB

### Development Tools

- VS Code
- Git & GitHub

---

## Project Structure

```text
Medical-Delivery-App/
│
├── public/
├── src/
├── server/
├── build/
├── package.json
├── package-lock.json
└── README.md
```

---

## System Architecture

```text
                     ┌──────────────┐
                     │    User      │
                     └──────┬───────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │ React Frontend  │
                   └────────┬────────┘
                            │ API Calls
                            ▼
                   ┌─────────────────┐
                   │ Node.js Server  │
                   └────────┬────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │    MongoDB      │
                   └─────────────────┘
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/koushik12122000/Medical-Delivery-App.git

cd Medical-Delivery-App
```

### Install Frontend Dependencies

```bash
npm install
```

### Install Backend Dependencies

```bash
cd server
npm install
```

---

## Running the Application

### Start Backend Server

```bash
node server.js
```

or

```bash
npm start
```

### Start Frontend

```bash
npm start
```

The application will be available at:

```text
http://localhost:3000
```

---

## Sample Workflow

### Step 1

User registers and logs into the application.

### Step 2

User searches for required medicines.

### Step 3

Medicines are added to the shopping cart.

### Step 4

Prescription is uploaded if required.

### Step 5

Order is placed successfully.

### Step 6

Pharmacy processes the order.

### Step 7

Delivery partner delivers medicines to the customer.

---

## Key Learning Outcomes

Through this project, I gained experience in:

- Full-Stack Web Development
- React Application Development
- REST API Development
- Node.js Backend Development
- Database Integration
- User Authentication
- Client-Server Communication
- Healthcare Application Design

---

## Future Enhancements

- Online Payment Gateway Integration
- GPS-Based Delivery Tracking
- Email Notifications
- SMS Alerts
- Admin Dashboard
- Doctor Consultation Module
- AI-Based Medicine Recommendation System
- Mobile Application Support

---



## Author

### Koushik

Software Engineer | Full-Stack Developer | AI & GenAI Enthusiast

GitHub:
https://github.com/koushik12122000

## License

This project is developed for educational and portfolio purposes.
