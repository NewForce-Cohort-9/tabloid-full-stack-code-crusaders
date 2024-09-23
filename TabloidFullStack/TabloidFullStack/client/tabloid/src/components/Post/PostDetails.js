import { useEffect, useState } from "react";
import { addTagsToPost, getPostById, removeTagFromPost } from "../../Managers/PostManager.js";
import { useParams } from "react-router-dom";
import { Button, Card, CardBody, Input } from "reactstrap";
import { getAllTags } from "../../Managers/TagManager.js";

export const PostDetails = () => {
  const [postDetails, setPostDetails] = useState({ tags: [] });
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getPostById(id).then((postObj) => {
      setPostDetails(postObj);
      // Pre-select the already associated tags
      const tagIds = postObj.tags?.map((tag) => tag.id) || [];
      setSelectedTags(tagIds);
    });
    getAllTags().then(setAllTags);
  }, [id]);
  

  const handleTagChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedTags((prevSelectedTags) =>
        prevSelectedTags.includes(value)
            ? prevSelectedTags.filter((tag) => tag !== value)
            : [...prevSelectedTags, value]
    );
  };

  const handleSaveTags = () => {
    // Use the existing state variable directly
    const tagIds = selectedTags; // `selectedTags` already holds the tag IDs
    addTagsToPost(postDetails.id, tagIds).then(() => {
      window.location.reload(); // Reload to reflect changes
    });
  };

  const handleRemoveTag = (tagId) => {
    removeTagFromPost(postDetails.id, tagId).then(() => {
      window.location.reload(); // Reload to reflect changes
    });
  };

  if (!postDetails.id) {
    return <div>No details yet</div>;
  }

  return (
    <>
      <Card className="m-4">
        <CardBody>
          <h2>{postDetails.title}</h2>
          <p>{postDetails.content}</p>
          <p>Tags:</p>
          {postDetails.tags?.map((tag) => (
            <span key={tag.id}>
              {tag.name} 
              <Button size="sm" onClick={() => handleRemoveTag(tag.id)}>
                Remove
              </Button>
            </span>
          ))}
          <div>
            <h4>Manage Tags</h4>
            {allTags.map((tag) => (
              <div key={tag.id}>
                <Input
                  type="checkbox"
                  value={tag.id}
                  checked={selectedTags.includes(tag.id)}
                  onChange={handleTagChange}
                />
                {tag.name}
              </div>
            ))}
            <Button onClick={handleSaveTags}>Save Tags</Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
