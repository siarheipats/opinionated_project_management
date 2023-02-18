import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useUpdateName = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const updateName = async (customerId, firstName, lastName) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customerId, firstName, lastName })
        });

        const json = await response.json();

        if (response.ok) {
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({ type: 'LOGIN', payload: json })
            setIsLoading(false);
        }
    }
    return { updateName, isLoading, error }
}