import { useAuthContext } from "../hooks/useAuthContext";

// pages
import Dashboard from './Dashboard'
import Login from './Login'

const Home = () => {

    const { user } = useAuthContext()

    return (
        <div>
            {user && (
                <div>
                    <Dashboard />
                </div>
            )}
            {!user && (
                <div>
                    <Login />
                </div>
            )}
        </div>
    )
}

export default Home;