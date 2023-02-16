import { useAuthContext } from "../hooks/useAuthContext";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const DashboardMain = ({ openedWorkspace, closeWorkspace }) => {
    const { user } = useAuthContext();

    const renderDashboard = () => {
        if (!openedWorkspace) {
            return (
                <Box sx={{ display: 'flex' }}>
                    <Typography paragraph>
                        <h2>Welcome, {user.user.firstName}.</h2>
                        <h4>Dashboard Main</h4>
                    </Typography>
                </Box>
            )
        }
        else {
            return (
                <div>{openedWorkspace.workspaceName}
                    <button onClick={() => closeWorkspace()}>Close</button>
                </div>
            )
        }
    }

    return (
        <div>
            {renderDashboard()}
        </div>
    )
}

export default DashboardMain;