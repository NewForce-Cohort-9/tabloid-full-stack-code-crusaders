import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap';

export const Reaction = ({reaction}) => {
const navigate = useNavigate();


  return (
    <Card>
        <CardBody>
            <p>
                {reaction.name}
                {reaction.imageLocation}                
            </p>
        </CardBody>
    </Card>
  )
}
