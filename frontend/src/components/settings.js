import { useState } from "react";

const Settings = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const updateName = async (e) => {
        e.preventDefault();
        // update name
    }

    const updatePassword = async (e) => {
        e.preventDefault();
        //update password
    }

    return (
        <div>
            <main class="form-signin w-100 m-auto">
                <form onSubmit={updateName}>
                    <h1 class="h3 mb-3 fw-normal">Personal Information</h1>
                    <div class="form-floating">
                        <input 
                            type="text" 
                            class="form-control" 
                            id="floatingInput" 
                            placeholder="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                        />
                        <label for="floatingInput">First Name</label>
                    </div>
                    <div class="form-floating">
                        <input 
                            type="text" 
                            class="form-control" 
                            id="floatingInput" 
                            placeholder="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                        />
                        <label for="floatingInput">Last Name</label>
                        <button class="w-100 btn btn-lg btn-primary" type="submit" >Update</button>
                        
                    </div>
                </form>
            </main> 
            <main class="form-signin w-100 m-auto">
                <form onSubmit={updatePassword}>
                    <h1 class="h3 mb-3 fw-normal">Password</h1>
                    <div class="form-floating">
                        <input 
                            type="email" 
                            class="form-control" 
                            id="floatingInput" 
                            placeholder="name@example.com"
                            onChange={(e) => setOldPassword(e.target.value)}
                            value={oldPassword}
                        />
                        <label for="floatingInput">Previous Password</label>
                    </div>
                    <div class="form-floating">
                        <input 
                            type="email" 
                            class="form-control" 
                            id="floatingInput" 
                            placeholder="name@example.com"
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={newPassword}
                        />
                        <label for="floatingInput">New Password</label>
                    </div>
                    <div class="form-floating">
                        <input 
                            type="email" 
                            class="form-control" 
                            id="floatingInput" 
                            placeholder="name@example.com"
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            value={confirmNewPassword}
                        />
                        <label for="floatingInput">Confirm Password</label>
                    </div>
                    <button class="w-100 btn btn-lg btn-primary" type="submit" >Update</button>
            
                </form>
            </main>        
        </div>
    )
}

export default Settings;