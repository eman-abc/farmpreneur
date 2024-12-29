import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../AuthContext";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBTypography,
    MDBInput,
    MDBBtn,
    MDBIcon,
} from "mdb-react-ui-kit";
import '../assets/cssfiles/cartpage.css';


const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            navigate("/login", { state: { from: window.location.pathname } });
        } else {
            const fetchCartItems = async () => {
                try {
                    const response = await axios.get("/cart", { withCredentials: true });
                    setCartItems(response.data.items);
                    calculateTotal(response.data.items);
                } catch (err) {
                    console.error("Error fetching cart items:", err);
                }
            };

            fetchCartItems();
        }
    }, [user, navigate]);

    const calculateTotal = (items) => {
        const total = items.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        );
        setTotalPrice(total);
    };

    const handleQuantityChange = async (productId, newQuantity) => {
        try {
            const response = await axios.put("/cart/update", {
                productId,
                quantity: newQuantity,
            });
            if (response.status === 200) {
                navigate("/cart");
            }
        } catch (err) {
            console.error("Error updating cart item quantity:", err);
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            const response = await axios.delete(`/cart/remove/${productId}`);
            setCartItems(response.data.items);
            calculateTotal(response.data.items);
        } catch (err) {
            console.error("Error removing cart item:", err);
        }
    };

    const handleCheckout = () => {
        navigate("/checkout", { state: { cartItems, totalPrice } });
    };

    if (cartItems.length === 0) {
        return <div className="text-center">Your cart is empty</div>;
    }

    return (
        <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol size="12">
                    <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                        <MDBCardBody className="p-0">
                            <MDBRow className="g-0">
                                <MDBCol lg="8">
                                    <div className="p-5">
                                        <div className="d-flex justify-content-between align-items-center mb-5">
                                            <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                                                Shopping Cart
                                            </MDBTypography>
                                            <MDBTypography className="mb-0 text-muted">
                                                {cartItems.length} items
                                            </MDBTypography>
                                        </div>
                                        <hr className="my-4" />
                                        {cartItems.map((item) => {
                                            const product = item.productId;
                                            const imageUrl = product?.imageUrl?.[0];

                                            return (
                                                <MDBRow key={item._id} className="mb-4 d-flex justify-content-between align-items-center">
                                                    <MDBCol md="2" lg="2" xl="2">
                                                        {imageUrl ? (
                                                            <MDBCardImage
                                                                src={imageUrl}
                                                                fluid
                                                                className="rounded-3"
                                                                alt={product.title}
                                                            />
                                                        ) : (
                                                            <div className="no-image">No image</div>
                                                        )}
                                                    </MDBCol>
                                                    <MDBCol md="3" lg="3" xl="3">
                                                        <MDBTypography tag="h6" className="text-muted">
                                                            {product.category || "Product"}
                                                        </MDBTypography>
                                                        <MDBTypography tag="h6" className="text-black mb-0">
                                                            {product.title}
                                                        </MDBTypography>
                                                    </MDBCol>
                                                    <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                                                        <MDBBtn
                                                            color="link"
                                                            className="px-2"
                                                            onClick={() => handleQuantityChange(item.productId._id, Math.max(1, item.quantity - 1))}
                                                        >
                                                            <MDBIcon fas icon="minus" />
                                                        </MDBBtn>

                                                        <MDBInput
                                                            type="number"
                                                            min="1"
                                                            value={item.quantity}
                                                            onChange={(e) =>
                                                                handleQuantityChange(item.productId._id, parseInt(e.target.value, 10))
                                                            }
                                                            size="sm"
                                                            style={{ width: "60px" }}
                                                        />

                                                        <MDBBtn
                                                            color="link"
                                                            className="px-2"
                                                            onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1)}
                                                            disabled={item.quantity >= product.stock}
                                                        >
                                                            <MDBIcon fas icon="plus" />
                                                        </MDBBtn>
                                                    </MDBCol>
                                                    <MDBCol md="3" lg="2" xl="2" className="text-end">
                                                        <MDBTypography tag="h6" className="mb-0">
                                                            ${product.price.toFixed(2)}
                                                        </MDBTypography>
                                                    </MDBCol>
                                                    <MDBCol md="1" lg="1" xl="1" className="text-end">
                                                        <MDBIcon
                                                            fas
                                                            icon="times"
                                                            className="text-muted"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => handleRemoveItem(item.productId._id)}
                                                        />
                                                    </MDBCol>
                                                </MDBRow>
                                            );
                                        })}
                                    </div>
                                </MDBCol>
                                <MDBCol lg="4" className="bg-grey">
                                    <div className="p-5">
                                        <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                                            Summary
                                        </MDBTypography>
                                        <hr className="my-4" />
                                        <div className="d-flex justify-content-between mb-4">
                                            <MDBTypography tag="h5" className="text-uppercase">
                                                Total
                                            </MDBTypography>
                                            <MDBTypography tag="h5">${totalPrice.toFixed(2)}</MDBTypography>
                                        </div>
                                        <MDBBtn color="dark" block size="lg" onClick={handleCheckout}>
                                            Proceed to Checkout
                                        </MDBBtn>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default CartPage;