const Register = () => {
    return (
        <div className="modal fade" id="register-modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Sign Up</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <div className="container mt-3">
                            <p>Please fill in this form to create an account.</p>
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
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-lock"></i></span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="Repeat your password" required></input>
                                </div>
                                <div className="d-flex justify-content-center"><button type="button" className="btn btn-success">Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;