const Login = () => {
    return (
        <div className="modal fade" id="login-modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Sign In</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>

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
                                <span className="psw">Forgot <a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#forgot-password-modal">password?</a></span>
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