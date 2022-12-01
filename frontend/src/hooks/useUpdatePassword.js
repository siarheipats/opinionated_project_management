import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useUpdatePassword = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const updatePassword = async (customerId, oldPassword, newPassword) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch ('/api/user/pwdchange', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({customerId, oldPassword, newPassword})
        })

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            // save the user's json object to local storage
            localStorage.setItem('user', JSON.stringify(json));
            // update the AuthContext
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false);
        }
    }

    return {updatePassword, isLoading, error}
}