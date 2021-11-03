import { useState, useEffect } from 'react';
import MissingFields from '../Global/MissingFields'

const Login = ({ showLogin, setShowLogin, setShowForgotPassword }) => {
    const [alert, setAlert] = useState('');


    useEffect(() => {
        if (showLogin) {
            document.getElementById('login-modal').addEventListener('click', (e) => {
                if (e.target.className == 'modal fade' || e.target.className == 'modal fade show') {
                    setShowLogin(false);
                }
            })
        }
    }, [showLogin]);

    return (
        <div className="modal fade" id="login-modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Sign In</h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={() => { setShowLogin(false) }}>&times;</button>

                    </div>
                    <div className="modal-body">
                        <div className="container mt-3">
                            <p>Please fill in this form to sign in.</p>
                            <form>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Your email..." required></input>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-lock"></i></span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="Your password..." required></input>
                                </div>
                                <span className="psw">Forgot&nbsp;
                                    <a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#forgot-password-modal" onClick={(e) => {
                                        e.preventDefault();
                                        setShowLogin(false);
                                        setShowForgotPassword(true);
                                    }}>
                                        password?
                                    </a>
                                </span>
                                <div className="d-flex justify-content-center"><button type="button" className="btn btn-success">Sign In</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;