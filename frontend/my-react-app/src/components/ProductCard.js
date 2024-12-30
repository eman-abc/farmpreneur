import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.imageUrl[0]} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: Rs.{product.price}</p>
            <p>Category: {product.category}</p>
            {product.ratings.length > 0 && (
                <p>Rating: {(product.ratings.reduce((a, b) => a + b, 0) / product.ratings.length).toFixed(1)}</p>
            )}
            <button>View Details</button>
        </div>
    );
};

export default ProductCard;
