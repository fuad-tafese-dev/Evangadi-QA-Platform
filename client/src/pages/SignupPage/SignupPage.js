import React, { useRef } from 'react'; // Only import useRef now
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import api from '../../services/api';
import './SignupPage.css';

const SignupPage = () => {
    // Define refs for each form field
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };

        console.log(formData); // Check the formData content

        try {
            const response = await api.post("/user/register", formData);
            console.log("Server Response:", response.data); // Log response
            alert("Registration successful!");

            // Redirect to Login page after successful registration
            navigate("/login"); // This will navigate to the LoginPage
        } catch (error) {
            console.error("Registration Error:", error.response ? error.response.data : error.message);
            alert(error.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h1>Join the network</h1>
                <p>
                    Already have an account? <a href="/login">Sign in</a>
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="First Name"
                            ref={firstNameRef}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            ref={lastNameRef}
                            required
                        />
                    </div>
                    <input
                        type="email"
                        placeholder="Email"
                        ref={emailRef}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        ref={usernameRef}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        ref={passwordRef}
                        required
                    />
                    <button type="submit">Agree and Join</button>
                </form>
            </div>

            <div className="about-section">
                <h2>About</h2>
                <h3>Evangadi Networks Q&A</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
                    voluptate efficit. Ikerat en uda pariatur erenet i nere accuserunt
                    idiorbiosentic, adipisci vero recloratis, recuandus sit ut, sem
                    quisquam? Mestelius, cu commodi.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
                    voluptate efficit. Ikerat en uda pariatur erenet i nere accuserunt
                    idiorbiosentic, adipisci vero recloratis, recuandus sit ut, sem
                    quisquam? Mestelius, cu commodi.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enum dolor
                    odio humurant, quaerat, mollestia. Iqas ogestilla ad eacquis nt dhuis
                    aliquam aut remo nisl nee cubu id laborum ipsum puron tempore!
                </p>

                <button className="how-it-works-button">HOW IT WORKS</button>
            </div>
        </div>
    );
};

export default SignupPage;
