import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { deactivateUser, reactivateUser } from "../../Managers/UserProfileManager.js";

export const UserProfile = ({ user }) => {
    const navigate = useNavigate();
    const userTypeId = localStorage.getItem("userTypeId");

    
    const handleEdit = () => {
        navigate(`/user/edit/${user.id}`);
    };
    
    const handleDeactivate = () => {
        if (window.confirm("Are you sure you want to deactivate this user?")) {
            deactivateUser(user.id).then(() => window.location.reload());
        }
    };

    const handleReactivate = () => {
        if (window.confirm("Are you sure you want to reactivate this user?")) {
            reactivateUser(user.id).then(() => window.location.reload());
        }
    };
    
    if (userTypeId !== "1") {
        return null; // Render nothing if the userTypeId is not 1
    }
    
    return (
        <Card>
            <CardBody>
                <h2>
                    <Link to={`/user/${user.id}`}>
                        <strong>{user.firstName}</strong>
                    </Link>
                </h2>
                <p>
                    {user.firstName} {user.lastName}
                </p>
                <p>
                    {user.userType.name} {/* Adjusted to access userType name */}
                </p>
                <Button color="primary" outline size="sm" onClick={handleEdit}>
                    Edit User Type
                </Button>
                {!user.isDeactivated ? (
                    <Button color="danger" size="sm" onClick={handleDeactivate}>Deactivate</Button>
                ) : (
                    <Button color="success" outline size="sm" onClick={handleReactivate}>Reactivate</Button>
                )}
            </CardBody>
        </Card>
    );
};
