import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useUpdateEmail = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const updateEmail = async (customerId, email) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/emailchange', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customerId, email })
        });

        const json = await response.json();

        if (response.ok) {
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({ type: 'LOGIN', payload: json })
            setIsLoading(false);
        }
    }
    return { updateEmail, isLoading, error }
}