import { useState } from "react";

const Home = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(email, password)
    }

    return(
        <div>
            <h1>Home Page</h1>
            <a href="/signup" className="link-primary">Sign Up</a>
            <form onSubmit={handleSubmit}>
                <h3>Sign up</h3>
                <label>Email:</label>
                <input
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label>Password:</label>
                <input
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button>Login</button>
            </form>
        </div>
    )
}

export default Home;