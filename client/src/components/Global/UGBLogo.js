import { useHistory } from 'react-router-dom';

const UGBLogo = () => {
    const history = useHistory();
    return (
        <a
            className="navbar-brand"
            href="#!"
            onClick={(e) => {
                e.preventDefault();
                history.push('/home');
            }}
        >
            <img src="/UrGymBudLogoLight.png" alt="Logo" style={{ height: '42px' }}></img>
        </a>
    );
}

export default UGBLogo;