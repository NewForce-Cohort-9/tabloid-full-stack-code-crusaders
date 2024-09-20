import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";


export const Post = ({ post }) => {
  return (
    <Card className="m-4">
      {/* <CardImg top src={post.imageLocation} alt={post.title} /> */}
      <CardBody>
        <h2>
          <Link to={`/post/${post.id}`}>
          <strong>{post.title}</strong>
          </Link>
        </h2>
        <p>{new Date(post.publishDateTime).toLocaleDateString()}</p>
        <p>Category: <em>{post.category.name}</em></p>
        {/* <Link to={`/Users/${post.userProfileId}`} className="navbar-brand">
            Posted by: {post.userProfile?.displayName}
        </Link> */}
        <Button color="primary" outline size="sm">Edit</Button>
        <Button color="success" outline size="sm">Delete</Button>
        </CardBody>
    </Card>
  );
};