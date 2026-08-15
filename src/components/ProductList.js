import React, { useState, useEffect } from 'react';
import './ProductList.css';
import ProductCard from './ProductCard';
import backend from '../axios';
import { Spinner, Alert } from 'react-bootstrap';

const ProductList = ({ selectedCategory, searchQuery, onAddToCart, onBuyNow }) => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMedicines() {
      setLoading(true);
      setError(false);
      try {
        const response = await backend.get('/api/medicines', {
          params: {
            category: selectedCategory !== 'All' ? selectedCategory : undefined,
            search: searchQuery.trim() !== '' ? searchQuery : undefined
          }
        });
        setMedicines(response.data);
      } catch (err) {
        console.error('Failed to fetch medicines:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMedicines();
  }, [selectedCategory, searchQuery]);

  if (loading) {
    return (
      <div className="productlist__loading text-center py-5">
        <Spinner animation="border" variant="success" style={{ width: '3rem', height: '3rem' }} />
        <p className="mt-3 text-muted">Loading medicines catalog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <Alert variant="danger" className="text-center">
          Unable to connect to backend server. Please make sure the Node.js Express server is running.
        </Alert>
      </div>
    );
  }

  if (medicines.length === 0) {
    return (
      <div className="text-center py-5">
        <h4 className="text-muted">No medicines found</h4>
        <p className="text-secondary">Try searching for a different name or choosing another category.</p>
      </div>
    );
  }

  return (
    <div className="productlist">
      {medicines.map((item) => (
        <ProductCard
          data={item}
          key={item._id || item.id}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      ))}
    </div>
  );
};

export default ProductList;
