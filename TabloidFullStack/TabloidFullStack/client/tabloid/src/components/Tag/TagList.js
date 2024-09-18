import React, { useEffect, useState } from "react";
import { getAllTags } from "../../Managers/TagManager.js";
import { Tag } from "./Tag.js";

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
        {tags.map((tag) => (
          <ul>
            <Tag key={tag.id} tag={tag}/>
          </ul>
        ))}
      </div>
    </div>
  );
};