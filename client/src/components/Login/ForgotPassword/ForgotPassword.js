import { useState, useEffect } from 'react';
import MissingFields from '../../Global/MissingFields';

const ForgotPassword = ({ showForgotPassword, setShowForgotPassword }) => {
    const [alert, setAlert] = useState('');

    useEffect(() => {
        if (showForgotPassword) {
            document.getElementById('forgot-password-modal').addEventListener('click', (e) => {
                if (e.target.className == 'modal fade' || e.target.className == 'modal fade show') {
                    setShowForgotPassword(false);
                }
            })
        }
    }, [showForgotPassword]);


    return (

        <div className="modal fade" id="forgot-password-modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Reset Your Password</h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={() => { setShowForgotPassword(false) }}>&times;</button>

                    </div>
                    <div className="modal-body">
                        <div className="container mt-3">
                            <p>Please provide your account email to reset your password.</p>
                            <form>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Your email..." required></input>
                                </div>
                                <div className="d-flex justify-content-center"><button type="button" className="btn btn-success">Reset Your Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ForgotPassword;