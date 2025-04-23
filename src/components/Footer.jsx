import '../styles/components/footer.css'
import FooterLogo from '../assets/stacked-logo.svg';

export default function Footer() {
    return (
    <>
    <footer>
            <div className="footer-logo">
                <a href="/">
                    <img src={FooterLogo} alt="Logo" />
                </a>
            </div>

            <div className="footer-links row">

                <div className="footer-links-col">
                    <h5>Quick Links</h5>
                    <ul>
                        <li><a href='/'>Home</a></li>
                        <li><a href='/spots'>Spots</a></li>
                        <li><a href='/about'>About</a></li>
                        <li><a href='/contribute'>Contribute</a></li>
                        <li><a href='/contact'>Contact</a></li>
                    </ul>
                </div>

                <div className="footer-links-col">
                    <h5>Newsletter</h5>
                    <div className="klaviyo-form-RKWyS3"></div>
                </div>

            </div>

        </footer>
    </>
    )
}