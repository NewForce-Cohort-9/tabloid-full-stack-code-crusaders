import React from 'react';
import { Button, Card, CardBody } from 'reactstrap';

export const Category = ({category}) => {

  return (
    <Card>
      <CardBody>
        <p>
        {category.name}
        <Button color="primary" outline size="sm">Edit</Button>
        <Button color="success" outline size="sm">Delete</Button>
        </p>
        </CardBody>  
    </Card>
  )
}
