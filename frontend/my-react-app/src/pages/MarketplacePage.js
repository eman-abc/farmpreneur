import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext'; // Import the custom auth context hook
import axiosInstance from '../api/axios';
import { useNavigate, useLocation } from 'react-router-dom';

const MarketplacePage = () => {
    const { user, loading } = useAuth(); // Access user and loading from AuthContext
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({ search: '', category: '', minPrice: '', maxPrice: '', sortBy: 'createdAt' });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [cart, setCart] = useState([]);
    const location = useLocation();
    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axiosInstance.get('/marketplace', {
                    params: { ...filters, page },
                });
                setProducts(data.products);
                setTotalPages(data.totalPages);
            } catch (err) {
                console.error('Error fetching products', err);
            }
        };

        fetchProducts();
    }, [filters, page]);

    const handleAddToCart = async (product) => {
        if (!user) {
            // If the user is not logged in, save the current page location and redirect to login
            navigate('/login', { state: { from: location.pathname } });
            return;
        }

        console.log("User from context:", user); // Ensure user is being fetched from context
        console.log('Adding to cart, Product ID:', product._id, 'Quantity:', 1);

        if (!product || !product._id) {
            console.error("Product ID is missing or undefined.");
            return;
        }

        try {
            // Send the product and quantity to the backend to add to the cart
            const response = await axiosInstance.post(
                'cart/add',
                { productId: product._id, quantity: 1 }, // Correctly set productId and quantity
                {
                    withCredentials: true,  // Include cookies with the request
                    headers: {
                        'Content-Type': 'application/json',  // Ensure it's sent as JSON
                    },
                }
            );

            console.log('Added to cart:', response.data);
            alert(`${product.title} has been added to your cart!`);
        } catch (error) {
            console.error('Error adding to cart:', error.response?.data || error.message);
        }
    };



    // Handle Card Click (Navigate to Product Details)
    const handleCardClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    // Show loading spinner/message if still loading
    if (loading) return <div>Loading...</div>;

    return (
        <div className="container my-4">
            <h1 className="text-primary">Marketplace</h1>

            <div className="row mb-4">
                <div className="col-md-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="form-control"
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-control"
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    >
                        <option value="">All Categories</option>
                        <option value="Handicrafts">Handicrafts</option>
                        <option value="Organic Produce">Organic Produce</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <input
                        type="number"
                        placeholder="Min Price"
                        className="form-control"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        type="number"
                        placeholder="Max Price"
                        className="form-control"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    />
                </div>
            </div>

            <div className="row">
                {products.map((product) => (
                    <div key={product._id} className="col-md-4 mb-4">
                        <div className="card shadow h-100" onClick={() => handleCardClick(product._id)}>
                            <img
                                src={product.imageUrl[0]}
                                className="card-img-top"
                                alt={product.title}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">Price: ${product.price}</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering the card click
                                        handleAddToCart(product);
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="d-flex justify-content-between mt-4">
                <button
                    className="btn btn-secondary"
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>
                <button
                    className="btn btn-secondary"
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MarketplacePage;
