import { UGBInput } from '../Global/UGBInput';
import { useStoreContext } from '../store/Store';
import useStyles from './styles'
// import UGBMissingFields from '../Global/UGBMissingFields'

const Login = ({ setShowLogin, setShowForgotPassword }) => {
    const [store, setStore] = useStoreContext();
    // const [alert, setAlert] = useState('');
    const styles = useStyles();

    return (
        <div>
            <div className="form-group d-flex justify-content-center row">
                <h4>Sign In</h4>
            </div>
            <hr></hr>
            <div className="container mt-3">
                <p>Please fill in this form to sign in.</p>
                <form>
                    <UGBInput
                        type='text'
                        name='mail'
                        placeholder="Your email"
                        iconStart='fas fa-envelope'
                    />
                    <UGBInput
                        type='password'
                        name='password'
                        placeholder="Your password"
                        iconStart='fas fa-lock'
                    />
                    <div>Forgot&nbsp;
                        <a href="#!" onClick={(e) => {
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