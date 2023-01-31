import { useAuthContext } from "../hooks/useAuthContext";

// pages
import Dashboard from './Dashboard'
import LandingPage from './LandingPage'
import NavBar from '../components/navbar';

const Home = () => {

    const { user } = useAuthContext();

    return (
        <div>
            <NavBar />
            {user && (
                <Dashboard />
            )}
            {!user && (
                <LandingPage />
            )}
        </div>
    )
}

export default Home;