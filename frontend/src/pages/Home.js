import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from 'react';

// pages
import Dashboard from './Dashboard'
import LandingPage from './LandingPage'
import NavBar from '../components/navbar';

const Home = () => {
    const [notifications, setNotifications] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchNotification = async () => {
            const response = await fetch(`api/shared/getinvites/?customerId=${user.user.customerId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const json = await response.json();
            if (response.ok) {
                setNotifications(json);
            }
        }
        fetchNotification();
    }, [setNotifications]);

    return (
        <div>
            <NavBar notifications={notifications} />
            {user && (
                <Dashboard notifications={notifications} />
            )}
            {!user && (
                <LandingPage />
            )}
        </div>
    )
}

export default Home;
