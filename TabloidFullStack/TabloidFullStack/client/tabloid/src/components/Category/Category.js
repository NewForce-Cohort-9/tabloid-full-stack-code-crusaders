import React from 'react';
import "./Category.css";
import { Button, Card, CardBody } from 'reactstrap';

export const Category = ({category}) => {

  return (
    <Card>
      <CardBody>
        <p>
        <h5>{category.name}</h5>
        <Button color="primary" outline size="sm">Edit</Button>
        <Button color="success" outline size="sm">Delete</Button>
        </p>
        </CardBody>  
    </Card>
  )
}
