import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { addComment } from "../../Managers/CommentManager.js";
import { useParams } from 'react-router-dom';



export const CommentCreate = () => {
    const postId = useParams();
    const [userProfileId, setUserProfileId] = useState(null);
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        if (userProfile && userProfile.id) {
            setUserProfileId(userProfile.id);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const comment = {
            postId: postId.id,
            userProfileId: userProfileId,
            subject: subject,
            content: content,
            createDateTime: new Date().toISOString()
        }
        try {
            await addComment(comment);
            window.alert("Comment added successfully");
            navigate(`/comments/${postId.id}`);
        } catch (error) {
            console.error("There was an error while trying to add comment:", error);
        }
    };

        

    return (
        <Form onSubmit={(e) => { handleSubmit(e); }}>
            <FormGroup className="mt-4">
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
            <FormGroup className="mt-4">
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
            <Button type="submit">Save</Button>
        </Form>
    );
};