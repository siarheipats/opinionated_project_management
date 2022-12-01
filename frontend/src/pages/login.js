import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);
    }

    return (
        <div>
            <main class="form-signin w-100 m-auto">
                <form onSubmit={handleSubmit}>
                    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
                    <div class="form-floating">
                        <input 
                            type="email" 
                            class="form-control" 
                            id="floatingInput" 
                            placeholder="nameuseUs@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input 
                            type="password" 
                            class="form-control" 
                            id="floatingPassword" 
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            />
                        <label for="floatingPassword">Password</label>
                    </div>
                    <span><a href="/signup" className="link-primary">Sign Up</a></span>
                    <br/>
                    <button class="w-100 btn btn-lg btn-primary" type="submit" disabled={isLoading}>Sign in</button>
                    {error && <div>{error}</div>}
                </form>
            </main>
        </div>
    )
}

export default Login;