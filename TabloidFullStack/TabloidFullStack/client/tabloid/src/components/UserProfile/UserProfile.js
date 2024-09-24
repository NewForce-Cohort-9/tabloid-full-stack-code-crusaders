import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { deactivateUser, reactivateUser } from "../../Managers/UserProfileManager.js";

export const UserProfile = ({ user }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/user/edit/${user.id}`);
    };

    const handleDelete = () => {
        navigate(`/user/delete/${user.id}`);
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
                    Edit
                </Button>
                <Button color="danger" size="sm" onClick={handleDelete}>
                    Delete
                </Button>
                {!user.isDeactivated ? (
                    <Button color="danger" onClick={handleDeactivate}>Deactivate</Button>
                ) : (
                    <Button color="success" outline onClick={handleReactivate}>Reactivate</Button>
                )}
            </CardBody>
        </Card>
    );
};
