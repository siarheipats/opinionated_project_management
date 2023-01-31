import { useAuthContext } from "../hooks/useAuthContext";

// pages
import Dashboard from './Dashboard'
import LandingPage from './LandingPage'

const Home = () => {

    const { user } = useAuthContext()

    return (
        <div>
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
