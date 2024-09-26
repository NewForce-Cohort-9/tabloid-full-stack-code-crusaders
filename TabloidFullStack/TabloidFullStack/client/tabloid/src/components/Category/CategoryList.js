import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../Managers/CategoryManager.js";
import { Category } from "./Category.js";
import { Button, Col } from "reactstrap";
import { Link } from "react-router-dom";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const userTypeId = localStorage.getItem("userTypeId");

  
  const getCategories = () => {
    getAllCategories().then((allCategories) => setCategories(allCategories));
  };
  
  useEffect(() => {
    getCategories();
  }, []);
  
  if (userTypeId !== "1") {
    return null; // Render nothing if the userTypeId is not 1
  }
  
  return (
    <div>
      <h2>Categories</h2>
      <div>
        <Link to="/category/add" key="category name">
        <Col>
          <Button color="info">Add New Category</Button>
          </Col>
        </Link>
      </div>
      <div>
        {categories.map((category) => (
          <ul>
            <Category key={category.id} getCategories={getCategories} category={category} />
          </ul>
        ))}
      </div>
    </div>
  );
};
