import LogoPlaceholder from "../assets/logo-placeholder.png";

function Navbar() {
    return (
        <menu>
            <div className="menu-container">
                <nav>
                    <img src={LogoPlaceholder} alt="Logo placeholder" className="logo" />
                </nav>

                <ul id="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#spots">Spots</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contribute">Contribute</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>

                <button>Sign Up</button>
            </div>
        </menu>
    )
}

export default Navbar;