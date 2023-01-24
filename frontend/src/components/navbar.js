import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { IoMdSettings } from "react-icons/io"
import { useState } from "react";
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleSettingsClick = () => {
        props.settingsToggle();
    };

    const handleLogout = () => {
        logout();
    }

    return (
        <header>
            <nav class="navbar navbar-dark bg-primary">
                <a class="navbar-brand" href="/">OPM</a>
                {user && (
                    <div>
                        <div>
                            <span>Welcome, {user.user.firstName}  </span>
                            <button onClick={handleLogout}>Log out</button>
                        </div>
                    </div>
                )}
                {!user && (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar;