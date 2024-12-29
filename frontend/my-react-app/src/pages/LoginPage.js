import React, { useState } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBBtn,
} from "mdb-react-ui-kit";
import { useAuth } from "../AuthContext";
import { useNavigate, useLocation as useRouterLocation } from "react-router-dom";
import '../assets/cssfiles/loginpage.css'
import loginPageImage from '../assets/images/loginpage3.webp'; // Adjust the path accordingly

const LoginPage = () => {
    const { login, user } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [name, setName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [userLocation, setUserLocation] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const location = useRouterLocation();

    if (user) {
        const redirectTo = location.state?.from?.pathname || "/marketplace";
        navigate(redirectTo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login({ email, password });
            const redirectTo = location.state?.from?.pathname || "/marketplace";
            navigate(redirectTo);
        } catch (err) {
            setError(err.message || "Login failed");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        try {
            alert("Registration successful. Please log in.");
            setIsRegistering(false);
        } catch (err) {
            setError(err.message || "Registration failed");
        }
    };

    return (
        <MDBContainer fluid className="p-4 background-radial-gradient overflow-hidden" style={{ backgroundImage: `url(${loginPageImage})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
            <MDBRow>
                <MDBCol md="6" className="text-center text-md-start d-flex flex-column justify-content-center">
                    <h1 className="my-5 display-3 fw-bold ls-tight px-3" >
                        {isRegistering ? "Join Us!" : "Welcome to FarmPreneur"}
                        <br />
                        <span >
                            {isRegistering ? "Empower Your Business Journey" : "Empowering Rural Women Entrepreneurs"}
                        </span>
                    </h1>
                    <p className="px-3" >
                        {isRegistering
                            ? "Join our platform to access tools, mentorship, and resources to grow your business."
                            : "We are dedicated to empowering rural women through technology and support."}
                    </p>
                </MDBCol>

                <MDBCol md="6" className="position-relative">
                    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                    <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                    <MDBCard className="my-5 bg-glass">
                        <MDBCardBody className="p-5">
                            <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                                {isRegistering && (
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                )}
                                <MDBInput
                                    wrapperClass="mb-4"
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <MDBInput
                                    wrapperClass="mb-4"
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {isRegistering && (
                                    <>
                                        <MDBInput
                                            wrapperClass="mb-4"
                                            label="Contact Number"
                                            type="text"
                                            value={contactNumber}
                                            onChange={(e) => setContactNumber(e.target.value)}
                                            required
                                        />
                                        <MDBInput
                                            wrapperClass="mb-4"
                                            label="Location"
                                            type="text"
                                            value={userLocation}
                                            onChange={(e) => setUserLocation(e.target.value)}
                                            required
                                        />
                                        <select
                                            className="form-select mb-4"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Role</option>
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </>
                                )}
                                {error && <div className="text-danger mb-4">{error}</div>}
                                <MDBBtn className="w-100 mb-4" type="submit">
                                    {isRegistering ? "Register" : "Login"}
                                </MDBBtn>
                            </form>
                            <div className="text-center">
                                <p>
                                    {isRegistering ? "Already have an account?" : "Don't have an account?"}
                                    <MDBBtn
                                        outline
                                        color="secondary"
                                        className="ms-2"
                                        onClick={() => setIsRegistering(!isRegistering)}
                                    >
                                        {isRegistering ? "Login" : "Register"}
                                    </MDBBtn>
                                </p>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default LoginPage;