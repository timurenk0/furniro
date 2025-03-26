import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { fetchUsers, addUser, loginUser } from "../services/userService";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const AuthForm = ({ isLogin, setIsLogin }) => {
        // eslint-disable-next-line no-unused-vars
        const [users, setUsers] = useState([]);
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [repeatPassword, setRepeatPassword] = useState("");
        const [showPassword, setShowPassword] = useState(false);
        const [agreed, setAgreed] = useState(false);
        const [error, setError] = useState("");

        const navigate = useNavigate();

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        }
        
        useEffect(() => {
            loadUsers();
        }, []);

        const loadUsers = async () => {
            const data = await fetchUsers();
            console.log(data);
            setUsers(data);
        }

        const handleSubmit = async (e) => {
            e.preventDefault();

            if (!isLogin) {
                if (password !== repeatPassword) {
                    setError("Passwords must match!");
                    return;
                }
    
                if (!agreed) {
                    setError("You must agree with 'Terms of service'");
                    return;
                }
            }

            setError("");
     
            try {
                if (isLogin) {
                    try {
                        // eslint-disable-next-line no-unused-vars
                        const result = await loginUser({ username, password });
                        toast.success("Successfully logged in!");
                        navigate("/shop", { state: { userLoggedIn: true }});
                        window.location.reload();
                    } catch (error) {
                        setError(error.response?.data?.error || "Invalid username or password");
                        console.error("Login error:", error);
                    }
                } else {
                    try {
                        const newUser = await addUser({ username, password });
                        console.log(newUser);
                        toast.success("Account created successfully!");
                        loadUsers();
                        setUsername("");
                        setPassword("");
                        setRepeatPassword("");
                        setAgreed(false);
                        setIsLogin(true);
                    } catch (error) {
                        const errorMsg = error.response?.data?.error || '';
                        
                        if (errorMsg.includes("Username already exists") || 
                            errorMsg.includes("duplicate key") || 
                            errorMsg.includes("E11000")) {
                            setError("This username is already taken! Please choose another one");
                        } else {
                            setError(errorMsg || error.message || "Failed to create account");
                        }
                        console.error("Registration error:", error);
                    }
                }
            } catch (error) {
                console.error("Authentication error:", error);
                toast.error(error.message || "An error occurred during authentication. Please try again later");
            }
        }   
    
    // Rest of the component remains the same
    return (
            <section className="vh-100 bg-image">
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss pauseOnHover theme="light" />
                
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                        <div className="card">
                            <div className="card-body p-5">
                            <h2 className="text-uppercase text-center mb-5">{isLogin ? "Login" : "Create an account"}</h2>

                            <form onSubmit={handleSubmit}>

                                <div data-mdb-input-init className="form-outline mb-4">
                                <label className="form-label" htmlFor="form3Example1cg">Username</label>
                                <input type="text" id="form3Example1cg" className="form-control form-control-lg mb-5" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                    <div className="position-relative">
                                        <input type={showPassword ? "text" : "password"} id="form3Example4cg" className="form-control form-control-lg mb-5" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="show-password-button"
                                        >
                                            {showPassword ? <FaEyeSlash className="text-gold" /> : <FaEye className="text-gold" />}
                                        </button>
                                        
                                    </div>
                                </div>
                                {/* Login page */}
                                {isLogin ? "" : (
                                <>
                                <div data-mdb-input-init className="form-outline mb-4">
                                <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                                <input type={showPassword ? "text" : "password"} id="form3Example4cdg" className="form-control form-control-lg mb-5" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                                </div>
                                <div className="form-check d-flex justify-content-center mb-5">
                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" checked={agreed} onChange={() => setAgreed(!agreed)} />
                                <label className="form-check-label" htmlFor="form2Example3g">
                                    I agree all statements in <a href="/terms-and-conditions" target="_blank" className="text-body"><u>Terms of service</u></a>
                                </label>
                                </div>
                                </>
                                )}

                                {error && <div className="alert alert-danger">{error}</div>}

                                <div className="d-flex justify-content-center">
                                <button type="submit" data-mdb-button-init
                                    data-mdb-ripple-init className="btn btn-block btn-lg" style={{backgroundColor: "var(--gold-color)", color: "white"}}>{isLogin ? "Login" : "Register"}</button>
                                </div>

                                <p className="text-center text-muted mt-5 mb-0">{isLogin ? "Don't have an account yet? " : "Have already an account? "}<a href="#!"
                                    className="fw-bold text-body" onClick={() => setIsLogin(!isLogin)}><u>{isLogin ? "Create an account" : "Login here"}</u></a></p>

                            </form>

                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
    )
}

AuthForm.propTypes = {
    isLogin: PropTypes.bool.isRequired,
    setIsLogin: PropTypes.func.isRequired,
}

export default AuthForm