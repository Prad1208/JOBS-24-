function Navbar({ darkMode, setDarkMode }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">

                <a className="navbar-brand fw-bold" href="#">
                    JOBS24
                </a>

                <button
                    className="btn btn-light"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
                </button>

            </div>
        </nav>
    );
}

export default Navbar;