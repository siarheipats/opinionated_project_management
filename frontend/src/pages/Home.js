import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from 'react';

import React from "react";
// pages
import Dashboard from './Dashboard'
import LandingPage from './LandingPage'
import NavBar from '../components/navbar';

const Home = () => {
    const [notifications, setNotifications] = useState([]);
    const [recentlyOpened, setRecentlyOpened] = useState({ recentlyOpenedId: 0, customerId: 0, recentList: "" });
    const { user } = useAuthContext();

    useEffect(() => {
        const localstorageUser = JSON.parse(localStorage.getItem('user'));
        setNotifications([]);
        const fetchRecentlyOpened = async () => {
            const response = await fetch(`/api/recentlist/recentlist/${localstorageUser.user.customerId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const json = await response.json();
            if (response.ok) {
                setRecentlyOpened(json);
            }
        }
        const fetchNotification = async () => {
            const response = await fetch(`api/shared/getinvites/?customerId=${localstorageUser.user.customerId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const json = await response.json();
            if (response.ok) {
                setNotifications(json);
            }
        }

        fetchRecentlyOpened();
        fetchNotification();
    }, [setRecentlyOpened, setNotifications]);

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

    const fetchRecentlyOpened = (workspace) => {
        let x = recentlyOpened.recentList;
        if (x.includes(workspace)) {
            return;
        }
        let myArray = x.split("|X|X|X|***");
        console.log(myArray);
        if (myArray.length === 5) {
            myArray.pop();
            myArray.unshift(workspace);
            recentlyOpened.recentList = myArray.join("|X|X|X|***");
            setRecentlyOpened(recentlyOpened);
        }
        else {
            workspace = `${workspace}|X|X|X|***`;
            recentlyOpened.recentList = workspace.concat(x);
            setRecentlyOpened(recentlyOpened);
        }

    }



    return (
        <div>
            <NavBar notifications={notifications} />
            {user && (
                <Dashboard notifications={notifications} setNotifications={setNotifications} updateNotifications={fetchNotification} recentlyOpened={recentlyOpened} setRecentlyOpened={setRecentlyOpened} fetchRecentlyOpened={fetchRecentlyOpened} />
            )}
            {!user && (
                <LandingPage />
            )}
        </div>
    )
}

export default Home;
