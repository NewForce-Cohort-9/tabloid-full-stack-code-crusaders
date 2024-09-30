import { Button, Col, Input, Row } from "reactstrap";
import { getSearchedPostsByTag } from "../../Managers/PostManager";


export const Search = ({search, setSearch, setPosts}) => {


    const controlledInputChange = (e) => {
        const newstate = {...search}
    
        newstate[e.target.name] = e.target.value
    
        setSearch(newstate)
    
    }


return(
    <>
    <Row>
        <Col>
            <Input 
                type="text" 
                placeholder="search posts by tag ..." 
                name='q' 
                onChange={(e) => controlledInputChange(e)}
            />
        </Col>
        <Col>
            <Button 
                color="success" outline
                onClick={() => 
                    getSearchedPostsByTag(search.q).then(
                        posts => setPosts(posts)
                    )}>
                        Search
            </Button>
        </Col>
    </Row>
    </>
) 

}