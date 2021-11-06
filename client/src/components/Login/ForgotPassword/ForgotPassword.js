import { useEffect } from 'react';
// import MissingFields from '../../Global/MissingFields';
import useStyles from '../styles'

const ForgotPassword = ({ showForgotPassword, setShowForgotPassword }) => {
    // const [alert, setAlert] = useState('');
    const classes = useStyles();

    useEffect(() => {
        if (showForgotPassword) {
            document.getElementById('forgot-password-modal').addEventListener('click', (e) => {
                if (e.target.className === 'modal fade' || e.target.className === 'modal fade show') {
                    setShowForgotPassword(false);
                    try {
                        document.getElementsByClassName('modal-backdrop')[0].remove()
                    } catch (err) {
                        return null;
                    }
                }
            })
        }
    }, [showForgotPassword]);

    return (
        <div className="modal fade" id="forgot-password-modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">
                            Reset Your Password
                        </h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={() => { setShowForgotPassword(false) }}>
                            &times;
                        </button>
                    </div>
                    <div className="modal-body">
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
                </div>
            </div>
        </div>

    );
}

export default ForgotPassword;