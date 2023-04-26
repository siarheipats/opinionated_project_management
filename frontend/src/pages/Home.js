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
        const localstorageUser = JSON.parse(localStorage.getItem('user'));
        fetchRecentlyOpened();
        fetchNotification();
    }, [setRecentlyOpened]);

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
        console.log(`My Array Length: ${myArray.length}`)
        console.log(myArray);
        if (myArray.length === 5) {
            console.log('I am triggered')
            myArray.pop();
            myArray.unshift(workspace);
            console.log("My Array length after unshift")
            recentlyOpened.recentList = myArray.join("|X|X|X|***");
            console.log(recentlyOpened.recentList);
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
