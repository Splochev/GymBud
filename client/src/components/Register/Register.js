// import UGBMissingFields from '../Global/UGBMissingFields'
import useStyles from './styles'
import UGBModal from '../Global/UGBModal';

const Register = ({ setShowRegister }) => {
    // const [alert, setAlert] = useState('');
    const classes = useStyles();

    return (
        <UGBModal width='sm' handleClose={setShowRegister}>
            <div className="form-group d-flex justify-content-center row">
                <h4>Sign Up</h4>
            </div>
            <hr></hr>
            <div className="container mt-3">
                <p>Please fill in this form to create an account.</p>
                <form>
                    <div class="form-group">
                        <div className="input-group-prepend">
                            <span className={`input-group-text ${classes.cornerless} ${classes.iconPrepend}`}><i className={"fas fa-envelope " + classes.icon}></i></span>
                            <input type="text" className={"form-control " + classes.cornerless} placeholder="Your email" required></input>
                        </div>
                    </div>
                    <div class="form-group">
                        <div className="input-group-prepend">
                            <span className={`input-group-text ${classes.cornerless} ${classes.iconPrepend}`}><i className={"fas fa-lock " + classes.icon}></i></span>
                            <input type="password" className={"form-control " + classes.cornerless} placeholder="Your password" required></input>
                        </div>
                    </div>
                    <div class="form-group">
                        <div className="input-group-prepend">
                            <span className={`input-group-text ${classes.cornerless} ${classes.iconPrepend}`}><i className={"fas fa-lock " + classes.icon}></i></span>
                            <input type="password" className={"form-control " + classes.cornerless} placeholder="Repeat your password" required></input>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center"><button type="button" className="btn btn-success">Sign Up</button>
                    </div>
                </form>
            </div>
        </UGBModal>
    );
}

export default Register;