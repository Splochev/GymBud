// import UGBMissingFields from '../Global/UGBMissingFields'
import useStyles from '../styles'

const ForgotPassword = () => {
    // const [alert, setAlert] = useState('');
    const classes = useStyles();

    return (
        <div>
            <div className="form-group d-flex justify-content-center row">
                <h4>Reset Your Password</h4>
            </div>
            <hr></hr>
            <div className="container mt-3">
                <p>Please provide your account email to reset your password.</p>
                <form>
                    <div class="form-group">
                        <div className="input-group-prepend">
                            <div className={`input-group-text ${classes.cornerless} ${classes.iconPrepend}`}><i className={"fas fa-envelope " + classes.icon}></i></div>
                            <input type="text" className={"form-control " + classes.cornerless} placeholder="Your email" required></input>
                        </div>
                    </div>
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