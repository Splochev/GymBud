import { useStoreContext } from '../store/Store';
import useStyles from './styles'
// import UGBMissingFields from '../Global/UGBMissingFields'

const Login = ({ setShowLogin, setShowForgotPassword }) => {
    const [store, setStore] = useStoreContext();
    // const [alert, setAlert] = useState('');
    const classes = useStyles();

    return (
        <div>
            <div className="form-group d-flex justify-content-center row">
                <h4>Sign In</h4>
            </div>
            <hr></hr>
            <div className="container mt-3">
                <p>Please fill in this form to sign in.</p>
                <form>
                    <div class="form-group">
                        <div className="input-group-prepend">
                            <div className={`input-group-text ${classes.cornerless} ${classes.iconPrepend}`}><i className={"fas fa-envelope " + classes.icon}></i></div>
                            <input type="text" className={"form-control " + classes.cornerless} placeholder="Your email" required></input>
                        </div>
                    </div>
                    <div class="form-group">
                        <div className="input-group-prepend">
                            <div className={`input-group-text ${classes.cornerless} ${classes.iconPrepend}`}><i className={"fas fa-lock " + classes.icon}></i></div>
                            <input type="password" className={"form-control " + classes.cornerless} placeholder="Your password" required></input>
                        </div>
                    </div>
                    <div>Forgot&nbsp;
                        <a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#forgot-password-modal" onClick={(e) => {
                            e.preventDefault();
                            setShowLogin(false);
                            setShowForgotPassword(true);
                        }}>
                            password?
                        </a>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button
                            // type="submit"
                            type="button"
                            className="btn btn-success"
                            onClick={(e) => {
                                setStore(state => (state.user = true, { ...state }));
                            }}
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;