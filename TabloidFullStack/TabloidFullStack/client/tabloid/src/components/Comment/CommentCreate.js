import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { addComment } from "../../Managers/CommentManager.js";
import { useParams } from 'react-router-dom';
import { getPostById } from "../../Managers/PostManager.js";



export const CommentCreate = () => {
    const postId = useParams();
    const [postTitle, setPostTitle] = useState("");
    const [userProfileId, setUserProfileId] = useState(null);
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        if (userProfile && userProfile.id) {
            setUserProfileId(userProfile.id);
        }
        getPostById(postId.id).then((postObj) => {
            setPostTitle(postObj.title)
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const comment = {
            postId: parseInt(postId.id),
            userProfileId: userProfileId,
            subject: subject,
            content: content,
            createDateTime: new Date().toISOString()
        }
        try {
            await addComment(comment);
            window.alert("Comment added successfully");
            navigate(`/comments/${parseInt(postId.id)}`);
        } catch (error) {
            console.error("There was an error while trying to add comment:", error);
        }
    };

        

    return (
        <div className="create-container">
            <h1 style={{textAlign: "center", textWrap:"wrap"}}>New Comment for Post: "{postTitle}"</h1>
        <Form onSubmit={(e) => { handleSubmit(e); }}
                style={{fontSize: "22px", fontWeight: "bold", textAlign: "center"}}>
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
            <div className="col-md-12 mt-5" style={{display: "flex", justifyContent: "space-evenly"}}>
            <Button className="col-md-2" type="submit" color="success">Save</Button>
            <Button className="col-md-2" type="back" color="danger" outline onClick={() => navigate(-1) }>Cancel</Button>
            </div>
        </Form>
        </div>
    );
};