import { useState } from "react";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(email, password, firstName, lastName, phoneNumber)
    }

    return (
        <div>
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
            <label>First Name:</label>
            <input
                type='text'
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
            />
            <label>Last Name:</label>
            <input
                type='text'
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
            />
            <label>Phone Number:</label>
            <input
                type='tel'
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
            />
            <button>Sign up</button>
           </form>
        </div>
    )
}

export default Signup;