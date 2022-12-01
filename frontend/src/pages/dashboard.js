import { useState } from "react";
import Navbar from "../components/navbar";
import Settings from "../components/settings"

const Dashboard = () => {

    const [settingsShown, setSettingsShown] = useState(false);
    
    const settingsOn = event => {
        setSettingsShown(current => !current)
    }

    return (
        <div>
            <Navbar settingsToggle = {settingsOn}/>
            {settingsShown === false && <h1>Dashboard</h1>}
            {settingsShown === true && <Settings/>}
        </div>
    )
}

export default Dashboard;