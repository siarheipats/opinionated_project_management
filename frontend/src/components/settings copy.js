import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";


const Settings = () => {
    const { user } = useAuthContext();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    //const {updateName, error, isLoading} = useUpdateName();
    //const {updatePassword, errorPwd, isLoadingPwd} = useUpdatePassword();

    // const handleUpdateName = async (e) => {
    //     e.preventDefault();
    //     await updateName(user.user.customerId, firstName, lastName); 
    // }

    // const handleUpdatePassword = async (e) => {
    //     e.preventDefault();
    //     await updatePassword(user.user.customerId, oldPassword, newPassword, confirmNewPassword);
    // }

    return (
        <div>
            <main class="form-signin w-100 m-auto">
                <form onSubmit={handleUpdateName}>
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
                        <button class="w-100 btn btn-lg btn-primary" type="submit" disabled={isLoading}>Update</button>
                        {error && <div>{error}</div>}
                    </div>
                </form>
            </main> 
            <main class="form-signin w-100 m-auto">
                <form onSubmit={handleUpdatePassword}>
                    <h1 class="h3 mb-3 fw-normal">Password</h1>
                    <div class="form-floating">
                        <input 
                            type="password" 
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
                            type="password" 
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
                            type="password" 
                            class="form-control" 
                            id="floatingInput" 
                            placeholder="name@example.com"
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            value={confirmNewPassword}
                        />
                        <label for="floatingInput">Confirm Password</label>
                    </div>
                    <button class="w-100 btn btn-lg btn-primary" type="submit" disabled={isLoadingPwd}>Update</button>
                    {errorPwd && <div>{errorPwd}</div>}
                </form>
            </main>        
        </div>
    )
}

export default Settings;