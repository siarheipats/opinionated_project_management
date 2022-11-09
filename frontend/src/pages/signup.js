import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const {signup, error, isLoading} = useSignup()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, phoneNumber, firstName, lastName, password);
        navigate('/');
    }

    return (
        <div>
            <main class="form-signin w-100 m-auto">
                <form onSubmit={handleSubmit}>
                    <h1 class="h3 mb-3 fw-normal">Sign up</h1>
                    <span><a href="/" className="link-primary">Back</a></span>
                    <div class="form-floating">
                        <input 
                            type="email" 
                            class="form-control" 
                            id="floatingInput" 
                            placeholder="name@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input 
                            type="password" 
                            class="form-control" 
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            />
                        <label for="floatingPassword">Password</label>
                    </div>
                    <div class="form-floating">
                        <input 
                            type="text" 
                            class="form-control" 
                            placeholder="Password"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            />
                        <label for="floatingPassword">First Name</label>
                    </div>
                    <div class="form-floating">
                        <input 
                            type="text" 
                            class="form-control" 
                            placeholder="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            />
                        <label for="floatingPassword">Last Name</label>
                    </div>
                    <div class="form-floating">
                        <input 
                            type="text" 
                            class="form-control" 
                            placeholder="Phone Number"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            value={phoneNumber}
                            />
                        <label for="floatingPassword">Phone Number</label>
                    </div>
                    <button class="w-100 btn btn-lg btn-primary" type="submit" disabled={isLoading}>Sign Up</button>
                    {error && <div>{error}</div>}
                </form>
            </main>
        </div>
    )
}

export default Signup;