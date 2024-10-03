import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import React from "react";
import { CommentDelete } from "./CommentDelete.js";
import { CommentEdit } from "./CommentEdit.js";
import { useNavigate } from "react-router-dom";


export const CommentCard = ({ comment }) => {

    const navigate = useNavigate();

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
    <Card className="mb-3" style={{boxShadow: "2px 3px 10px gray"}}>
        <CardBody>
            <CardTitle tag="h5">{comment.subject}</CardTitle>
            <CardText>{comment.content}</CardText>
            <CardText>
                <small className="text-muted">By {comment.userProfile.displayName} on {formatDate(comment.createDateTime).split(',', [2]).join(' at')}</small>
            </CardText>
        </CardBody>
            <Button className="ml-auto" color="danger" 
                    style={{position: "absolute", right: "1rem", bottom: "0.75rem", width: "7%"}}
                    onClick={() => CommentDelete(comment)}>
                Delete
            </Button>
            <Button className="ml-auto" color="secondary" 
                    style={{position: "absolute", right: "1rem", top: "0.75rem", width: "7%"}}
                    // Here, I'm sending the passed comment prop object as state to CommentEdit, 
                    // then I will define it again there with useLocation() in react-router-dom 
                    // so I can achieve the same goal and use less http requests in that component.
                    // This was the initial idea, but it failed multiple tests. I had to revert and create a new repository method for CommentEdit's use.
                    onClick={() => navigate(`/comments/edit/${comment.id}`)}>
                Edit
            </Button>
    </Card>
)};

