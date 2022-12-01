import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { IoMdSettings } from "react-icons/io"

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext()

    const handleLogout = () => {
        logout();
    }

    const handleSettings = () => {

    }

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">LOGO</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <span class="navbar-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome, {user.user.firstName} {user.user.lastName}</span>
                    </li>
                </ul>
                <span class="navbar-text">
                    <a href="/settings">
                        <IoMdSettings size="50px" style={{paddingRight: 20}} onClick={handleSettings}/>
                    </a>
                </span>
                <span class="navbar-text">
                    <button class="btn btn-primary" type="button" onClick={handleLogout}>Log out</button>
                </span>
            </div>
        </div>
    </nav>
    )
}

export default Navbar;