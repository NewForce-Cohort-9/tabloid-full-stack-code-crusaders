import React from 'react';
import { Button, Card, CardBody } from 'reactstrap';
import { deleteCategory } from '../../Managers/CategoryManager.js';

export const Category = ({
    category,
}) => {
    
    const handleDelete = () => {
        deleteCategory(category.id);
      };

  return (
    <Card>
      <CardBody>
        <p>
        {category.name}
        <Button color="primary" outline size="sm">Edit</Button>
        <Button color="success" outline size="sm" onClick={handleDelete}>Delete</Button>
        </p>
        </CardBody>  
    </Card>
  )
}
