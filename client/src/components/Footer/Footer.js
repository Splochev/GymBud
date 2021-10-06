import useStyles from './styles.js'

const Footer = () => {
    const classes = useStyles();
    return (
        <nav className={"navbar navbar-expand-sm justify-content-center fixed-bottom " + classes.copyrightNav}>
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
                            className={"fab fa-linkedin-in " + classes.icon}></i></a>
                    {/* Github */}
                    <a className="btn btn-outline-light btn-floating m-1" href="https://github.com/Splochev" rel="noreferrer" target="_blank"
                        role="button"><i className={"fab fa-github " + classes.icon}></i></a>
                </div>
                <section className="copyright">
                    <a className={classes.copyrightUrl} href="https://www.linkedin.com/in/stanislav-p-14023a155" rel="noreferrer" target="_blank">&copy;
                        2021
                        Stanislav Plochev</a>
                </section>
            </section>
        </nav>
    );
}

export default Footer;