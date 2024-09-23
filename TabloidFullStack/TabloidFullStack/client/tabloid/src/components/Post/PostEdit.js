import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { getAllCategories } from "../../Managers/CategoryManager.js"
import { editPost} from "../../Managers/PostManager.js"
import { Button, Form, Col, Input, Label, Row } from "reactstrap"

export const PostEdit = () => {
    const [postCategories, setPostCategories] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageLocation, setImageLocation] = useState("");
    const [post, setPost] = useState({});

    const { state } = useLocation()
    const navigate = useNavigate()

    const updatePost = async (e) => {
        e.preventDefault()
        await editPost(post)
        navigate(`/post/${post.id}`)
    }

    useEffect(() => {
        setTitle(state.post.title)
        setContent(state.post.content)
        setImageLocation(state.post.imageLocation)
    }, [state])

    useEffect(() => {
        let postCopy = {}
        postCopy.id = state.post.id
        postCopy.title = title
        postCopy.content = content
        postCopy.imageLocation = imageLocation
        postCopy.categoryId = state.post.categoryId

        setPost(postCopy)
    }, [title, content, imageLocation])

    useEffect(() => {
        getAllCategories().then(categoryArr => setPostCategories(categoryArr))
    }, [])

    return (
        <>
            <div className="create-container">
            <h1>Add New Post</h1>
            <Form>
                <Row className="row-cols-lg-auto g-3 align-items-center">
                    <Col>
                        <Label for="addPostTitle">Edit Title</Label>
                        <Input id="addPostTitle"
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }} value={title}>
                        </Input>
                        <br />
                        <Label for="addPostContent">Content</Label>
                        <Input id="addPostContent" 
                        onChange={(e) => {
                            setContent(e.target.value)
                            }}value={content}>
                        </Input>
                        <br/>
                        <Label for="addPostImageLocation">Image Url</Label>
                        <Input id="addPostImageLocation" 
                        onChange={(e) => {
                            setImageLocation(e.target.value)
                        }} value={imageLocation}>
                        </Input>
                        <br/>
                        <select name="categories" id="createPostCategories" 
                            onChange={(e) => {
                                let copy = {...post}
                                copy.categoryId = parseInt(e.target.value)
                                setPost(copy)
                            }}>
                            <option>Select Post Category:</option>
                            {postCategories.map(category => {
                                if (state.post.categoryId === category.id) {
                                    return <option value={`${category.id}`} selected>{category.name}</option>
                                } else {
                                    return <option value={`${category.id}`} >{category.name}</option>
                                }
                            })}
                        </select>
                        <br />
                        <Button id="submitNewPost" type="submit" 
                        onClick={(e) => updatePost(e)}>
                            Update Post!
                        </Button>
                        <br/>
                        <Link to={`/post/${post.id}`}>Back to post details!</Link>
                    </Col>
                </Row>
            </Form>
            </div>
        </>
    )
}