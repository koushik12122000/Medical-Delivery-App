import React from 'react';
import './ProductCard.css';
import { Button, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaBolt } from 'react-icons/fa';

const ProductCard = ({ data, onAddToCart, onBuyNow }) => {
  return (
    <div className="productcard">
      <div className="productcard__image-container">
        <img
          src={data.img || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60'}
          alt={data.name}
        />
        <Badge variant="success" className="productcard__badge">
          {data.category}
        </Badge>
      </div>
      <div className="productcard__content">
        <h4 className="productcard__title">{data.name}</h4>
        <p className="productcard__desc">{data.description}</p>
        <div className="productcard__price font-weight-bold text-success">
          ₹{data.price}
        </div>
      </div>
      <div className="productcard__buttons">
        <Button
          variant="outline-success"
          className="d-flex align-items-center justify-content-center flex-fill mr-2"
          onClick={() => onAddToCart(data)}
        >
          <FaShoppingCart className="mr-1" /> Add to Cart
        </Button>
        <Button
          variant="success"
          className="d-flex align-items-center justify-content-center flex-fill"
          onClick={() => onBuyNow(data)}
        >
          <FaBolt className="mr-1" /> Buy Now
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
