import { useAuthContext } from "../hooks/useAuthContext";
import WorkspaceDetails from "./workspace_components/workspaceDetails";

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
                <WorkspaceDetails workspace={openedWorkspace} closeWorkspace={closeWorkspace} />
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