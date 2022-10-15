import axios from 'axios'
import {React,useState,useEffect} from 'react'
import { Link } from 'react-router-dom';

function List(props) {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const getPosts = async ()=> {
        const res = await axios.get("/api/posts");
          setPosts(res.data);
          console.log(res.data);
       };
    getPosts();
    }, [])
    

    const filteredData = posts.filter((el)=> {
        if(props.input === ''){
            return el;
        }
        else{
            return el.title.toLowerCase().includes(props.input);
        }
    })
  return (
    <ul>
        {filteredData.map((item)=>(
            <Link className='link' to={`/post/${item._id}`}>
                <li key={item._id}>{item.title}</li>
            </Link>
            
        ))}
    </ul>
  )
}

export default List