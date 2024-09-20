import React, { useState } from 'react'

export const CategoryEdit = () => {
    const [name, setName] = useState([]);
    


  return (
    <div className="create-container">
      <h1>Add Category</h1>
      <Form>
        <Row className="row-cols-lg-auto g-3 align-items-center">
          <Col>
            <Input
              id="category"
              type="text"
              defaultValue={category.name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <Button color="info" onClick={handleSave}>
              Save
            </Button>
            <Button>Cancel</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
