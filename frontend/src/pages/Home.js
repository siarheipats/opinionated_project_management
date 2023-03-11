import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState, useRef } from 'react';
import React from "react";
// pages
import Dashboard from './Dashboard'
import LandingPage from './LandingPage'
import NavBar from '../components/navbar';

//MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const Home = () => {
    const [notifications, setNotifications] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchNotification = async () => {
            const response = await fetch(`api/shared/getinvites/?customerId=${user.user.customerId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const json = await response.json();
            if (response.ok) {
                setNotifications(json);
            }
        }
        fetchNotification();
    }, [setNotifications]);

    const fetchNotification = async () => {
        const response = await fetch(`api/shared/getinvites/?customerId=${user.user.customerId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const json = await response.json();
        if (response.ok) {
            setNotifications(json);
        }
    }

    return (
        <div>
            <NavBar notifications={notifications} />
            {user && (
                <div>
                    <Dashboard notifications={notifications} setNotifications={setNotifications} updateNotifications={fetchNotification}/>
                </div>
            )}
            {!user && (
                <LandingPage />
            )}
        </div>
    )
}

export default Home;
