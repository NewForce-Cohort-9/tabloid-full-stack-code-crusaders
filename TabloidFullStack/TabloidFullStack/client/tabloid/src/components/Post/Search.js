import { Button, Input } from "reactstrap";
import { getSearchedPostsByTag } from "../../Managers/PostManager";


export const Search = ({search, setSearch, setPosts}) => {


    const controlledInputChange = (e) => {
        const newstate = {...search}
    
        newstate[e.target.name] = e.target.value
    
        setSearch(newstate)
    
    }


return(
    <>
    <Input 
        type="text" 
        placeholder="search goes here ..." 
        name='q' 
        onChange={(e) => controlledInputChange(e)}
    />
    <Button 
        color="success" outline
        onClick={() => 
            getSearchedPostsByTag(search.q).then(
                posts => setPosts(posts)
            )}>
                Search
    </Button>
    </>
) 

}