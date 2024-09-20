import React, { useEffect, useState } from "react";
import { getAllTags } from "../../Managers/TagManager.js";
import { Tag } from "./Tag.js";
import { Link } from "react-router-dom";
import { Button, Col } from "reactstrap";

export const TagList = () => {
  const [tags, setTags] = useState([]);

  const getTags = () => {
    getAllTags().then((allTags) => setTags(allTags));
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <div>
      <h2>Tags</h2>
      <div>
        <Link to="/tag/add" key="tag name">
            <Col>
                <Button color="info">Add a new Tag</Button>
            </Col>
        </Link>
        </div>
        <div>
        {tags.map((tag) => (
          <ul>
            <Tag key={tag.id} tag={tag}/>
          </ul>
        ))}
      </div>
    </div>
  );
};