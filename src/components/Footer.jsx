import FooterLogo from '../assets/footer-logo.svg';

export default function Footer() {
    return (
    <>
        <footer>
            <div className="footer-logo">
                <img src={FooterLogo} alt="Logo" />
            </div>

            <div className="footer-links">

                <div className="footer-links-col">
                    <h6>Quick Links</h6>
                    <ul>
                        <li><a>Home</a></li>
                        <li><a>About</a></li>
                        <li><a>Spots</a></li>
                        <li><a>Contribute</a></li>
                        <li><a>Contact</a></li>
                    </ul>
                </div>

                <div className="footer-links-col">
                    <h6>Cities</h6>
                    <ul>
                        <li><a>Tel Aviv</a></li>
                        <li><a>Ramat Gan</a></li>
                        <li><a>Haifa</a></li>
                        <li><a>Jerusalem</a></li>
                    </ul>
                </div>

                <div className="footer-links-col">
                    <h6>Newsletter</h6>
                    <p>Stay in touch</p>
                    {/* To be added (form) */}
                </div>

            </div>

        </footer>
    </>
    )
}