import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import ShoppingPage from './pages/ShoppingPage';
import AdminPanel from './components/AdminPanel';
import BookAppointmentPage from './pages/BookAppointmentPage';
import Footer from './components/Footer';
import ScrollToTop from './ScrollToTop';

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Switch>
        {/* Primary Home Route is the Medicine Delivery Platform */}
        <Route exact path="/" component={ShoppingPage} />
        <Route path="/shop" component={ShoppingPage} />
        <Route path="/admin" component={AdminPanel} />
        <Route path="/appointments" component={AdminPanel} />
        <Route path="/book_appointment" component={BookAppointmentPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
