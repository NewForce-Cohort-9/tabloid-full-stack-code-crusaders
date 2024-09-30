import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserByType, editUserType, getAdminCount } from "../../Managers/UserProfileManager"; // Add getAdminCount
import { Button, Card, CardBody, Col, Form, Input, Row } from "reactstrap";

export const EditUserType = () => {
    const [userProfile, setUserProfile] = useState({});
    const [adminCount, setAdminCount] = useState(0);
    const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate();

    useEffect(() => {
        // Get user by ID
        getUserByType(id).then((userProfile) => {
            if (userProfile) {
                setUserProfile(userProfile);
            }
        });

        // Get the count of admins
        getAdminCount().then((count) => {
            setAdminCount(count);
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Get the new UserTypeId value from the form
        const newUserTypeId = parseInt(e.target.userTypeId.value); // Assuming your form has a "userTypeId" field
    
        // Prevent changing the last admin's UserType to non-admin
        if (adminCount === 1 && userProfile.userTypeId === 1 && newUserTypeId !== 1) {
            alert("You must have at least one admin. Please make another user an admin before changing this user's role.");
            return;
        }
    
        // Create the updated user profile
        const updatedUserProfile = {
            ...userProfile,
            userTypeId: newUserTypeId  // Use the updated value from the form
        };
    
        // Call the edit function to update the user's type
        editUserType(updatedUserProfile).then(() => {
            navigate("/user");  // Redirect back to user profile list after update
        });
    };
    
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserProfile({
            ...userProfile,
            [name]: value
        });
    };

    const userTypeId = localStorage.getItem("userTypeId");

    if (userTypeId !== "1") {
        return null; // Render nothing if the userTypeId is not 1
    }

    return (
        <div className="edit-container">
            <Card className="m-4">
                <CardBody>
                    <h2>{userProfile.fullName}</h2>
                    <img 
                      src={userProfile.imageLocation || '/path/to/default-image.jpg'}
                      alt="User Avatar"
                      style={{ maxWidth: '150px', height: 'auto' }}
                    />
                    <p><strong>Display Name:</strong> {userProfile.displayName}</p>
                    <p><strong>Email:</strong> {userProfile.email}</p>
                    <p><strong>Creation Date:</strong> {new Date(userProfile.createDateTime).toLocaleDateString()}</p>
                    <p><strong>User Type:</strong> {userProfile.userTypeId}</p>
                <h1>Edit User Type</h1>
                <Form onSubmit={handleSubmit}>
                    <Row className="row-cols-lg-auto g-3 align-items-center">
                        <Col>
                            <Input
                                id="userType"
                                name="userTypeId"
                                type="select"
                                value={userProfile.userTypeId || ""}
                                onChange={handleChange}
                            >
                                <option value={1}>Admin</option>
                                <option value={2}>Author</option>
                            </Input>
                        </Col>
                        <Col>
                            <Button color="info" type="submit">
                                Update User Type
                            </Button>
                            <Button color="secondary" onClick={() => navigate("/user")}>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Form>
                </CardBody>
            </Card>
        </div>
    );
};
