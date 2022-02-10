import { UGBInput } from '../../Global/UGBInput';

const ForgotPassword = () => {
    return (
        <div>
            <h4 className="form-group d-flex justify-content-center row">Reset Your Password</h4>
            <hr/>
            <div className="container mt-3">
                <p>Please provide your account email to reset your password.</p>
                <form>
                    <UGBInput
                        type='text'
                        name='mail'
                        placeholder="Your email"
                        iconStart='fas fa-envelope'
                    />
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-success">
                            Reset Your Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;