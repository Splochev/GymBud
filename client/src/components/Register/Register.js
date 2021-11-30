// import UGBMissingFields from '../Global/UGBMissingFields'
import useStyles from './styles'

const Register = () => {
    // const [alert, setAlert] = useState('');
    const classes = useStyles();

    return (
        <div>
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
        </div>
    );
}

export default Register;