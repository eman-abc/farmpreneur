import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

const ProductList = ({ products }) => {
  return (
    <div>
      <h5>Your Products</h5>
      <ListGroup>
        {products.length > 0 ? (
          products.map((product) => (
            <ListGroup.Item key={product._id}>
              <h6>{product.title}</h6>
              <p>{product.description}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              {/* You can add edit or delete functionality later */}
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No products available. Add a new product.</ListGroup.Item>
        )}
      </ListGroup>
      <Button variant="primary" className="mt-3">Add New Product</Button>
    </div>
  );
};

export default ProductList;
