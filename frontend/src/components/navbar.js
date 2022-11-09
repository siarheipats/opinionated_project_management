const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">OPMLOGO</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <span class="navbar-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome, [FirstName] [LastName]</span>
                    </li>
                </ul>
                <span class="navbar-text">
                    <button class="btn btn-primary" type="button">Logout</button>
                </span>
            </div>
        </div>
    </nav>
    )
}

export default Navbar;