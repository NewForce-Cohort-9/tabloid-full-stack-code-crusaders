import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";

export const UserProfile = ({ user }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/user/edit/${user.id}`);
    };

    const handleDelete = () => {
        navigate(`/user/delete/${user.id}`);
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
                <Button color="danger" outline size="sm" onClick={handleDelete}>
                    Delete
                </Button>
            </CardBody>
        </Card>
    );
};
