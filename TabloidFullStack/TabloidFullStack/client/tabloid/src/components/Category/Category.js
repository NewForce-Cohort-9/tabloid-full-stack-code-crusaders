import React from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export const Category = ({ category }) => {
  return (
    <Card>
      <CardBody>
        <p>
          {category.name}
          <Link to={`/category/edit/${category.id}`}>
            {" "}
            <Button color="primary" outline size="sm">
              Edit
            </Button>
          </Link>
          <Link to={`/category/delete/${category.id}`}>
            <Button color="success" outline size="sm">
              Delete
            </Button>
          </Link>
        </p>
      </CardBody>
    </Card>
  );
};
