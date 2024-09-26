import { useEffect, useState } from "react";
import { getAllUsers, getDeactivatedUsers } from "../../Managers/UserProfileManager.js";
import { UserProfile } from "./UserProfile.js";
import { Button } from "reactstrap";

export const UserProfileList = () => {
    const [userProfiles, setUserProfiles] = useState([]); // Active users
    const [deactivatedProfiles, setDeactivatedProfiles] = useState([]); // Deactivated users
    const [showDeactivated, setShowDeactivated] = useState(false); // Toggle for showing deactivated users
    const userTypeId = localStorage.getItem("userTypeId");

    
    // Fetch all active users (excluding deactivated users)
    useEffect(() => {
        getAllUsers().then(users => {
            const activeUsers = users.filter(user => !user.isDeactivated); // Filter out deactivated users
            setUserProfiles(activeUsers);
        });
    }, []);
    
    // Fetch all deactivated users when the button is clicked
    const viewDeactivatedUsers = () => {
        getDeactivatedUsers().then(setDeactivatedProfiles);
        setShowDeactivated(true); // Show deactivated users
    };

    // Hide deactivated users
    const hideDeactivatedUsers = () => {
        setShowDeactivated(false);
    };
    
    if (userTypeId !== "1") {
        return null; // Render nothing if the userTypeId is not 1
    }
    
    return (
        <div>
            <h2>User Profiles</h2>
            {userProfiles.length > 0 ? (
                userProfiles.map(user => <UserProfile key={user.id} user={user} />)
            ) : (
                <p>No active users available.</p>
            )}

            {!showDeactivated && (
                <Button color="info" onClick={viewDeactivatedUsers}>
                    View Deactivated Users
                </Button>
            )}

            {showDeactivated && (
                <>
                    <Button color="warning" onClick={hideDeactivatedUsers}>
                        Hide Deactivated Users
                    </Button>
                    <h2>Deactivated User Profiles</h2>
                    {deactivatedProfiles.length > 0 ? (
                        deactivatedProfiles.map(user => <UserProfile key={user.id} user={user} />)
                    ) : (
                        <p>No deactivated users available.</p>
                    )}
                </>
            )}
        </div>
    );
};


