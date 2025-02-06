import FooterLogo from '../assets/stacked-logo.svg';

export default function Footer() {
    return (
    <>
    <div className="footer-container">
    <footer>
            <div className="footer-logo">
                <a href="/">
                    <img src={FooterLogo} alt="Logo" />
                </a>
            </div>

            <div className="footer-links row">

                <div className="footer-links-col fl-small">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href='/'>Home</a></li>
                        <li><a href='/spots'>Spots</a></li>
                        <li><a>About</a></li>
                        <li><a>Contribute</a></li>
                        <li><a>Contact</a></li>
                    </ul>
                </div>

                <div className="footer-links-col fl-small">
                    <h4>Cities</h4>
                    <ul>
                        <li><a>Tel Aviv</a></li>
                        <li><a>Ramat Gan</a></li>
                        <li><a>Haifa</a></li>
                        <li><a>Jerusalem</a></li>
                    </ul>
                </div>

                <div className="footer-links-col fl-large">
                    <h4>Newsletter</h4>
                    <div className="klaviyo-form-RKWyS3"></div>
                </div>

            </div>

        </footer>
    </div>
    </>
    )
}