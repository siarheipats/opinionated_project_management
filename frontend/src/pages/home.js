import { useAuthContext } from "../hooks/useAuthContext";

// pages
import Dashboard from './dashboard'
import Login from './login'

const Home = () => {
    
    const {user} = useAuthContext()

    return(
        <div>
            {user && (
            <div>
                <Dashboard/>
            </div>
            )}
            {!user && (
            <div>
                <Login/>
            </div>
            )}
        </div>
    )
}

export default Home;