import { useHistory } from 'react-router-dom';

const UGBLogo = () => {
    const history = useHistory();
    return (
        <a
            style={{
                display: 'inline-block',
                paddingTop: '0.3125rem',
                paddingBottom: '0.3125rem',
                fontSize: "1.25rem",
                lineHeight: 'inherit',
                whiteSpace: 'nowrap',
                marginRight:'1rem',
            }}
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