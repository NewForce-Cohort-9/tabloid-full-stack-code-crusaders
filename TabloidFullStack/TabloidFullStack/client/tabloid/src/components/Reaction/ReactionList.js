import React, { useEffect, useState } from 'react'
import { getAllReactions } from '../../Managers/ReactionManager.js';
import { Link } from 'react-router-dom';
import { Button, Col } from 'reactstrap';
import { Reaction } from './Reaction.js';

export const ReactionList = () => {
    const [reactions, setReactions] = useState([]);

    const getReactions = () => {
        getAllReactions().then((allReactions) => setReactions(allReactions))
    };

    useEffect(() => {
        getReactions();
    }, []);

  return (
    <div>
      <h2>Reactions</h2>
      <div>
        <Link to="/reaction/add" key="reaction name">
            <Col>
                <Button color="info">Add a new Reaction</Button>
            </Col>
        </Link>
        </div>
        <div>
        {reactions.map((reaction) => (
          <ul>
            <Reaction key={reaction.id} reaction={reaction}/>
          </ul>
        ))}
      </div>
    </div>
  )
}
