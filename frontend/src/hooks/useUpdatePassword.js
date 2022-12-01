import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useUpdatePassword = () => {
    const [errorPwd, setError] = useState(null);
    const [isLoadingPwd, setIsLoading] = useState(null);

    const updatePassword = async (customerId, oldPassword, newPassword, confirmNewPassword) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch ('/api/user/pwdchange', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({customerId, oldPassword, newPassword, confirmNewPassword})
        })

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            // save the user's json object to local storage
            localStorage.setItem('user', JSON.stringify(json));
            setIsLoading(false);
        }
    }

    return {updatePassword, isLoadingPwd, errorPwd}
}