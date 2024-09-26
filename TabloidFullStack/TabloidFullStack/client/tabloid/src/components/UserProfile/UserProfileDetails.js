import { useEffect, useState } from "react";
import { getUserById } from "../../Managers/UserProfileManager.js";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

export const UserProfileDetails = () => {
    const [userDetails, setUserDetails] = useState(null); // Initialize as null
    const { id } = useParams();
    const userTypeId = localStorage.getItem("userTypeId");

    
    useEffect(() => {
        getUserById(id)
        .then((userObj) => {
            if (userObj) { // Check if the response is not null or undefined
                    setUserDetails(userObj);
                } else {
                    console.error("No user data found");
                    setUserDetails(null); // Set as null if no data is returned
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
        }, [id]);
        
        if (userTypeId !== "1") {
            return null; // Render nothing if the userTypeId is not 1
        }
        
    if (!userDetails) {
        return <div>Loading or no data available...</div>; // Handle null case
    }

    return (
        <Card className="m-4">
            <CardBody>
                <h2>{userDetails.fullName}</h2>
                <img 
                  src={userDetails.imageLocation || '/path/to/default-image.jpg'}
                  alt="User Avatar"
                  style={{ maxWidth: '150px', height: 'auto' }}
                />
                <p><strong>Display Name:</strong> {userDetails.displayName}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>Creation Date:</strong> {new Date(userDetails.createDateTime).toLocaleDateString()}</p>
                <p><strong>User Type:</strong> {userDetails.userType.name}</p>
            </CardBody>
        </Card>
    );
};

