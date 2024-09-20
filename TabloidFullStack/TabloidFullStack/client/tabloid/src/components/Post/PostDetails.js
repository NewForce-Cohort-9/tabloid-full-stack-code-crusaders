import { useEffect, useState } from "react";
import { getPostById } from "../../Managers/PostManager.js";
import { Link, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardImg } from "reactstrap";

export const PostDetails = () => {
  const [postDetails, setPostDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getPostById(id).then((postObj) => setPostDetails(postObj));
  }, [id]);

  if (!postDetails.id) {
    return <div>No details yet</div>;
  }

  return (
    <>
      <Card className="m-4">
      <CardImg top src={`${postDetails.imageLocation}`} alt={`Image for ${postDetails.title}`} />
      <CardBody>
        <h2 className="text-left px2">{postDetails.title}</h2>
        <hr />
        <p className="text-left px2">Content: {postDetails.content}</p>
        <p className="text-left px2">Published On: {new Date(postDetails.publishDateTime).toLocaleDateString()}</p>
        <p className="text-left px2">
          Posted By: {postDetails.userProfile.displayName}
        </p>
        <Link to="/post" key="post">
          <Button color="info">Return to Posts</Button>
        </Link>
      </CardBody>
      </Card>
    </>
  );
};