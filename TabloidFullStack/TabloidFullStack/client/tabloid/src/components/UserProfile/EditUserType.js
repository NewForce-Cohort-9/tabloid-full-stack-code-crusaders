import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserByType, editUserType } from "../../Managers/UserProfileManager";
import { Button, Card, CardBody, Col, Form, Input, Row } from "reactstrap";

export const EditUserType = () => {
    const [userProfile, setUserProfile] = useState({});
    const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate();

    useEffect(() => {
        getUserByType(id).then((userProfile) => {
            if (userProfile) {
                setUserProfile(userProfile);
            }
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUserProfile = {
            ...userProfile,
            userTypeId: parseInt(userProfile.userTypeId)  // Ensure userTypeId is an integer
        };

        console.log("Updated UserProfile being sent:", updatedUserProfile);

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

