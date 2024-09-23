import { Card, CardBody, CardText, CardTitle } from "reactstrap";


export const CommentCard = ({ comment }) => {

    // Added a formatDate function to get some exposure to a more standardized version of front-end date formatting
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (!isNaN(date)) {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
            return new Intl.DateTimeFormat('en-US', options).format(date);
        } else {
            return "";
        }
    };

    return (
    <Card className="mb-3">
        <CardBody>
            <CardTitle tag="h5">{comment.subject}</CardTitle>
            <CardText>{comment.content}</CardText>
            <CardText>
                <small className="text-muted">By {comment.userProfile.displayName} on {formatDate(comment.createDateTime).split(',', [2]).join(' at')}</small>
            </CardText>
        </CardBody>
    </Card>
)};

