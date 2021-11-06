import { useEffect } from 'react';
// import MissingFields from '../Global/MissingFields'
import useStyles from './styles'

const Login = ({ showLogin, setShowLogin, setShowForgotPassword }) => {
    // const [alert, setAlert] = useState('');
    const classes = useStyles();


    useEffect(() => {
        if (showLogin) {
            document.getElementById('login-modal').addEventListener('click', (e) => {
                if (e.target.className === 'modal fade' || e.target.className === 'modal fade show') {
                    setShowLogin(false);
                    try {
                        document.getElementsByClassName('modal-backdrop')[0].remove()
                    } catch (err) {
                        return null;
                    }
                }
            })
        }
    }, [showLogin]);

    return (
        <div className="modal fade" id="login-modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Sign In</h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={() => { setShowLogin(false) }}>&times;</button>

                    </div>
                    <div className="modal-body">
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