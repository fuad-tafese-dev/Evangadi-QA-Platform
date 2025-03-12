import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./LandingPage.css";

const LandingPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/user/login", { email, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/home");
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message ||
                "Something went wrong. Please try again later."
            );
        }
    };

    return (
        <div className="landing-page">
            <div className="content-wrapper">
                <div className="login-box">
                    <h2>Login to your account</h2>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Your Password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button type="submit" className="submit-button">
                            Submit
                        </button>
                    </form>

                    <p>
                        Don't have an account?{" "}
                        <Link to="/register" className="create-account-link">
                            Create a new account
                        </Link>
                    </p>
                </div>

                <div className="about-section">
                    <h2>About</h2>

                    <h3>Evangadi Networks Q&A</h3>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quidem
                        voluptate officiis beatae nobis pariatur omnis facere accusamus
                        laboriosam hic, adipisci vero reiciendis, recusandae sit amet,
                        numquam quisquam! Molestias, ut commodi!
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quidem
                        voluptate officiis beatae nobis pariatur omnis facere accusamus
                        laboriosam hic, adipisci vero reiciendis, recusandae sit amet,
                        numquam quisquam! Molestias, ut commodi!
                    </p>
                    <button className="how-it-works-button">HOW IT WORKS</button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
