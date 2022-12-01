import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useUpdateName = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const updateName = async (customerId, firstName, lastName) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/user/update', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({customerId, firstName, lastName})
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

    return {updateName, isLoading, error}
}