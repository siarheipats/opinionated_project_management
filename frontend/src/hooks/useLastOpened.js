import { useState } from "react";

export const useRecentlyOpened = () => {
    const [customerId, setCustomerId] = useState(null);
    const [recentlyOpenedId, setRecentlyOpenedId] = useState(null);
    const [stackList, setStackList] = useState(null);

    const getRecentlyOpenedId = async (customerId) => {
        setCustomerId(customerId);
        const response = await fetch(`api/recentlist/recentlist/${customerId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await response.json();
        if (response.ok) {
            setRecentlyOpenedId(json.recentlyOpenedId);
            setStackList(json.recentList);
        }
    }

    const addRecentlyOpened = async (workspace) => {
        const response = await fetch('api/recentlist/recentlist/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recentlyOpenedId, customerId, workspace })
        });

        const json = await response.json();
        if (response.ok) {
            await getRecentlyOpenedId(customerId);
        }
    }
    return { customerId, recentlyOpenedId, stackList, getRecentlyOpenedId, addRecentlyOpened }
}