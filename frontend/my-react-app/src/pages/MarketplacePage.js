import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext'; // Import the custom auth context hook
import axiosInstance from '../api/axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../assets/cssfiles/marketplace.css'; // Ensure you import the correct CSS

const MarketplacePage = () => {
    const { user, loading } = useAuth(); // Access user and loading from AuthContext
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({ search: '', category: '', minPrice: '', maxPrice: '', sortBy: 'createdAt' });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [cart, setCart] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

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
            navigate('/login', { state: { from: location.pathname } });
            return;
        }

        try {
            const response = await axiosInstance.post(
                'cart/add',
                { productId: product._id, quantity: 1 },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            alert(`${product.title} has been added to your cart!`);
        } catch (error) {
            console.error('Error adding to cart:', error.response?.data || error.message);
        }
    };

    const handleCardClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="marketplace-container mt-4">
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
                        <div className="card shadow h-100 marketplace-card" onClick={() => handleCardClick(product._id)}>
                            <img
                                src={product.imageUrl[0]}
                                className="card-img-top marketplace-card-img"
                                alt={product.title}
                            />
                            <div className="card-body marketplace-card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">Price: ₨{product.price}</p>

                                <button
                                    className="btn btn-primary"
                                    onClick={(e) => {
                                        e.stopPropagation(); 
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

            <div className="d-flex justify-content-between mt-4 marketplace-pagination">
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
