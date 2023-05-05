import { useState } from "react";

export const useUpdatePassword = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const updatePassword = async (customerId, oldPassword, newPassword, confirmNewPassword) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/pwdchange', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customerId, oldPassword, newPassword, confirmNewPassword })
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error)
        }

        if (response.ok) {
            setIsLoading(false);
        }
    }

    return { updatePassword, isLoading, error }
}