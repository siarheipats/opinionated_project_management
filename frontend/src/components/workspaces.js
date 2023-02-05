import { useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";

const Workspaces = (props) => {

    const { user } = useAuthContext();
    const [workspaces, setWorkspaces] = useState(null);

    useEffect(() => {
        const fetchWorkspaces = async () => {
            const response = await fetch(`/api/workspace/workspaces/${user.user.customerId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })

            const json = await response.json();
            //console.log(json);
            if (response.ok) {
                setWorkspaces(json);
            }
        }
        fetchWorkspaces();
    }, []);

    return (
        <div>
            Workspaces:
            {workspaces && workspaces.map((workspace) => (
                <p key={workspace.workspaceId}>
                    {workspace.workspaceName}
                    {workspace.dateCreated}
                </p>
            ))}
        </div>
    );
}

export default Workspaces;