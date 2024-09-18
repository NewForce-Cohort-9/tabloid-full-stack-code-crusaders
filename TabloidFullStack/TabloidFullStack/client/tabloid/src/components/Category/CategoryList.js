import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../Managers/CategoryManager.js";
import { Category } from "./Category.js";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    getAllCategories().then((allCategories) => setCategories(allCategories));
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <div>
        {categories.map((category) => (
          <ul>
            <Category key={category.id} category={category}/>
          </ul>
        ))}
      </div>
    </div>
  );
};
