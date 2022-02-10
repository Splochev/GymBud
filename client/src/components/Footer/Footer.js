import { makeStyles } from '@material-ui/core';
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
    copyrightNav: {
        backgroundColor: '#343a40',
    },
    copyrightUrl: {
        color: 'white',
        fontSize: '20px',
        '&:hover': {
            color: 'white'
        }
    },
    icon: {
        fontSize: '24px'
    },
    footer: {
        position: 'sticky',
        top: '100vh'
    }
}));

const Footer = () => {
    const styles = useStyles();
    return (
        <nav className={clsx('navbar navbar-expand-sm justify-content-center', styles.copyrightNav, styles.footer)}>
            <section className="mb-4">
                {/* Facebook */}
                {/* <a className="btn btn-outline-light btn-floating m-1" href="https://www.facebook.com/" target="_blank"
                    role="button"><i className="fab fa-facebook"></i></a> */}
                {/* Twitter */}
                {/* <a className="btn btn-outline-light btn-floating m-1" href="https://twitter.com/" target="_blank"
                    role="button"><i className="fab fa-twitter"></i></a> */}
                {/* Gmail */}
                {/* <a className="btn btn-outline-light btn-floating m-1" href="https://www.google.bg/" target="_blank"
                    role="button"><i className="fab fa-google"></i></a> */}
                {/* Instagram */}
                {/* <a className="btn btn-outline-light btn-floating m-1" href="https://www.instagram.com/" target="_blank"
                    role="button"><i className="fab fa-instagram"></i></a> */}
                <div className="d-flex justify-content-center">
                    {/* Linkedin */}
                    <a className="btn btn-outline-light btn-floating m-1"
                        href="https://www.linkedin.com/in/stanislav-p-14023a155" rel="noreferrer" target="_blank" role="button"><i
                            className={"fab fa-linkedin-in " + styles.icon}></i></a>
                    {/* Github */}
                    <a className="btn btn-outline-light btn-floating m-1" href="https://github.com/Splochev" rel="noreferrer" target="_blank"
                        role="button"><i className={"fab fa-github " + styles.icon}></i></a>
                </div>
                <section className="copyright">
                    <a className={styles.copyrightUrl} href="https://www.linkedin.com/in/stanislav-p-14023a155" rel="noreferrer" target="_blank">&copy;
                        2021
                        Stanislav Plochev</a>
                </section>
            </section>
        </nav>
    );
}

export default Footer;