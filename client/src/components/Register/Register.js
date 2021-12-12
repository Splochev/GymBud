// import UGBMissingFields from '../Global/UGBMissingFields'
import { UGBInput } from '../Global/UGBInput';
import useStyles from './styles'


const Register = () => {
    // const [alert, setAlert] = useState('');
    const styles = useStyles();

    return (
        <div>
            <div className="form-group d-flex justify-content-center row">
                <h4>Sign Up</h4>
            </div>
            <hr></hr>
            <div className="container mt-3">
                <p>Please fill in this form to create an account.</p>
                <form>
                    <UGBInput
                        type='text'
                        placeholder="Your email"
                        name='email'
                        iconStart='fas fa-envelope'
                    />
                    <UGBInput
                        type='password'
                        name='password'
                        placeholder='Your password'
                        iconStart='fas fa-lock'
                    />
                    <UGBInput
                        type='password'
                        name='repeatPassword'
                        placeholder='Repeat password'
                        iconStart='fas fa-lock'
                    />
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-success">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;