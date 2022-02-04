import { UGBInput } from '../Global/UGBInput';
import { useStoreContext } from '../store/Store';
import { postData } from '../utils/FetchUtils'
import { useHistory } from 'react-router-dom';

const Login = ({ setShowLogin, setShowForgotPassword }) => {
    const [store, setStore] = useStoreContext();
    const history = useHistory();
    
    async function onLogin(e) {
        e.preventDefault()
        try {
            const form = new FormData(e.target);
            const email = form.get('mail');
            const password = form.get('password');
            const data = await postData(process.env.REACT_APP_HOST + '/api/user/login', { email: email[0], password: password[0] });
            if (!data) {
                throw Error('Incorrect email or password!')
            }
            setStore(state => (state.user = data, { ...state }))
            history.push('/');
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div>
            <div className="form-group d-flex justify-content-center row">
                <h4>Sign In</h4>
            </div>
            <hr></hr>
            <div className="container mt-3">
                <p>Please fill in this form to sign in.</p>
                <form onSubmit={onLogin}>
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
                            type="submit"
                            className="btn btn-success"
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