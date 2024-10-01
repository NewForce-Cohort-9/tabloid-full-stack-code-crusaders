import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { editComment } from "../../Managers/CommentManager.js";
import { getCommentById } from "../../Managers/CommentManager.js";

// TO DO: Create an http request for getting a single comment by id in C# controller.
// Use useParams to obtain the comment's id to pass to this method.
// Remind myself to stop trying to do impossible things on the frontend to fabricate workarounds for something simple.



export const CommentEdit = () => {
    const [form, setForm] = useState({
    id: '',
    postId: '', 
    userProfileId: '',
    subject: '',
    content: '',
    createDateTime: '',
    });

    const { id } = useParams();

    const navigate = useNavigate();


    useEffect(() => {
        getCommentById(id).then((singleComment) => {
            setForm(singleComment);
        });
    }, [id]);


    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // const handleBack = (e) => {
    //     e.preventDefault();
    //     if (!location.state) {
    //         return <p>Cancelled.</p>
    //     }
    //     else {
    //     navigate(-1, { state: location.state });
    //     }
    // };  

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedComment = {
            id: form.id,
            postId: form.postId, 
            userProfileId: form.userProfileId,
            subject: form.subject,
            content: form.content,
            createDateTime: form.createDateTime
        };
        
        try {
            await editComment(updatedComment);
            window.alert("Changes saved successfully");
            navigate(`/comments/${form.postId}`);
        } catch (error) {
            console.error("There was an error while trying to edit comment:", error);
        }
    };

   


    return (
        <div className="create-container">
            <h1 style={{textAlign: "center", textWrap:"wrap"}}>Edit Comment for Post: "{form.post ? (form.post.title) : ("")}"</h1>
        <Form style={{fontSize: "22px", fontWeight: "bold", textAlign: "center"}}
              onSubmit={(e) => { handleSubmit(e); }}>
            <FormGroup className="mt-4">
                <Label for="subject">Subject</Label>
                <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                />
            </FormGroup>
            <FormGroup className="mt-4">
                <Label for="content">Content</Label>
                <Input
                    type="textarea"
                    id="content"
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    placeholder="Content"
                    required
                />
            </FormGroup>
            <div className="col-md-12 mt-5" style={{display: "flex", justifyContent: "space-evenly"}}>
            <Button className="col-md-2" type="submit" color="success">Save</Button>
            <Button className="col-md-2" type="back" color="danger" outline onClick={() => navigate(`/comments/${form.postId}`)}>Cancel</Button>
            </div>
        </Form>
        </div>
    );
};