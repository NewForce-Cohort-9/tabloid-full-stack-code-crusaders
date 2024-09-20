import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Input, Row } from 'reactstrap';
import { getCategoryById, updateCategory } from '../../Managers/CategoryManager.js';
import { Link } from 'react-router-dom';

export const CategoryEdit = ({category, getCategories}) => {
    const [name, setName] = useState({
        name: category.name
    });   

    useEffect(() => {
        getCategoryById(category.id).then((data) => {
            setName(data)
        })
    }, [])

    const handleSave = (e) => {
        e.preventDefault()
        const name = {...category}
        name = category.id
        updateCategory(name)
        .then(getCategories)
    }

  return (
    <div className="create-container">
      <h1>Add Category</h1>
      <Form>
        <Row className="row-cols-lg-auto g-3 align-items-center">
          <Col>
            <Input
              id="category"
              type="text"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <Button color="info" onClick={handleSave}>
              Save
            </Button>
            <Link to="/category"><Button>Cancel</Button></Link>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
