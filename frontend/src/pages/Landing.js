import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from 'react';

import React from "react";
// pages
import LandingPage from './LandingPage'
import NavBar from '../components/navbar';

const Landing = () => {
    let notifications = [];
    return (
        <div>
            <NavBar notifications={notifications} />
            <LandingPage />
        </div>
    )
}

export default Landing;