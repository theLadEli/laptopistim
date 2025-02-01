import Logo from "../assets/logo.svg";

function Navbar() {
    return (
        <div className="container">
            <menu>
                <img src={Logo} alt="Logo" className="logo" />

                <nav className="row">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#spots">Spots</a></li>
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