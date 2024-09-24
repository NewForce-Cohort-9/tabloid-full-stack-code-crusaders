import { useEffect, useState } from "react";
import { getAllUsers } from "../../Managers/UserProfileManager.js";
import { UserProfile } from "./UserProfile.js";

export const UserProfileList = () => {
    const [userProfiles, setUserProfiles] = useState([]);

    useEffect(() => {
        getAllUsers().then(allUsers => setUserProfiles(allUsers));
    }, []);

    return (
        <div className="container">
            <h2>User Profiles</h2>
            <div className="cards-column">
                {userProfiles.map((user) => (
                    <UserProfile key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
};
