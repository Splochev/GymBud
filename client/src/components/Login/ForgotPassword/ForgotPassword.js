const ForgotPassword = () => {
    return (

        <div className="modal fade" id="forgot-password-modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Reset Your Password</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>

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