import { Link } from 'react-router-dom';
import Logo from "../assets/logo.svg";

function Navbar() {
    return (
        <div className="container">
            <menu>
                <img src={Logo} alt="Logo" className="logo" />

                <nav className="row">
                    <Link to="/">Home</Link>
                    <Link to="/spots">Spots</Link>
                    <Link to="/">About</Link>
                    <Link to="/">Contribute</Link>
                    <Link to="/">Contact</Link>
                </nav>

                <button className="primary">Register</button>
            </menu>
        </div>
    )
}

export default Navbar;