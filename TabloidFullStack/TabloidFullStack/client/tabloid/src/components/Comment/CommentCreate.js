import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { addComment } from "../../Managers/CommentManager.js";



export const AddComment = ({ postId, userProfileId }) => {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const comment = {
            postId,
            userProfileId,
            subject,
            content,
            createDateTime: new Date().toISOString()
        }
        addComment(comment).then(() => {
            window.alert("Comment added successfully");
            navigate(`/comments/${postId}`);
        })
    };

        

    return (
        <Form onSubmit={(e) => { handleSubmit(e); }}>
            <FormGroup>
                <Label for="subject">Subject</Label>
                <Input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject"
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="content">Content</Label>
                <Input
                    type="textarea"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    required
                />
            </FormGroup>
            <Button type="submit">Add Comment</Button>
        </Form>
    );
};