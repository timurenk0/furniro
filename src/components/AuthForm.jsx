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
            setUsers(data);
        }

        
        const handleSubmit = async (e) => {
            e.preventDefault();

            if (!isLogin) {
                if (password !== repeatPassword) {
                    setError("Passwords must match!");
                    return ;
                }
    
                if (!agreed) {
                    setError("You must agree with 'Terms of service'");
                    return ;
                }
            }


            setError("");
     
            try {
                
                if (isLogin) {
                    try {
                        await loginUser({ username, password });
                        toast.success("Successfully logged in!");

                        navigate("/");
                    } catch (error) {
                        setError(error.respone?.data?.error || "Invalid username or password");
                        console.error("Login error:", error);
                    }
                    
                } else {
                    const result = await addUser({ username, password });

                    if (result && result.error === "User already exists") {
                        setError("User with this username already exists!");
                    } else {
                        toast.success("Account created successfully!");
                        loadUsers();
                        setUsername("");
                        setPassword("");
                        setRepeatPassword("");
                        setAgreed(false);
                        setIsLogin(true);
                    }
                }
                
            } catch (error) {
                console.error("Authentication error:", error);
                toast.error(error.message || "An error occurred during authentication. Please try again later");
            }
            
        }   
    
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
                                <input type={showPassword ? "text" : "password"} id="form3Example4cg" className=" position-relative form-control form-control-lg mb-5" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="btn btn-link position-absolute me-4 pe-3 translate-middle-y mt-3 mt-md-3 pt-md-4 mt-lg-4 pb-lg-3 me-lg-4 mt-xl-4 pt-xl-4"
                                    style={{
                                        background: "transparent",
                                        border: "none",
                                        cursor: "pointer",
                                        fontSize: "18px",
                                        top: "38%",
                                        right: "5%"
                                    }}
                                >
                                    {showPassword ? <FaEyeSlash className="text-gold" /> : <FaEye className="text-gold" />}
                                </button>
                                </div>

                                {/* Login page */}
                                {isLogin ? "" : (
                                <>
                                <div data-mdb-input-init className="form-outline mb-4">
                                <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                                <input type={showPassword ? "text" : "password"} id="form3Example4cdg" className="form-control form-control-lg mb-5" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                                </div>
                                <div className="form-check d-flex justify-content-center mb-5">
                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" onChange={() => setAgreed(!agreed)} />
                                <label className="form-check-label" htmlFor="form2Example3g">
                                    I agree all statements in <a href="/terms-and-conditions" target="_blank" className="text-body"><u>Terms of service</u></a>
                                </label>
                                </div>
                                </>
                                )}

                                {error && <div className="alert alert-danger">{error}</div>}

                                <div className="d-flex justify-content-center">
                                <button  type="submit" data-mdb-button-init
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