import Logo from "../assets/logo.svg";

function Navbar() {
    return (
        <div className="container">
            <menu>
                <a href="/">
                    <img src={Logo} alt="Logo" className="logo" />
                </a>

                <nav className="row">
                    <li><a href="/">Home</a></li>
                    <li><a href="/spots">Spots</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contribute">Contribute</a></li>
                    <li><a href="#contact">Contact</a></li>
                </nav>

                <button className="primary">Register</button>
            </menu>
        </div>
    )
}

export default Navbar;