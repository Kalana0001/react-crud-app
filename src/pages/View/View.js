import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";
import "./View.css";

const View = () => {
    const [user, setUser] = useState([]);

    const {id} = useParams([]);

    useEffect(() => { 
        axios.get(`http://localhost:4000/api/get/${id}`)
             .then((resp) => setUser({...resp.data[0]}));
    }, [id]);

  return (
    <div style={{marginTop: "100px"}}>
        <div className='card'>
            <div className='card-header'>
                <p>{user.name} 's Contact Details</p>
            </div>
            <div className='container'>
                <strong>ID:</strong>
                <span>{id}</span>
                <br/>
                <br/>
                <strong>Name:</strong>
                <span>{user.name}</span>
                <br/>
                <br/>
                <strong>Email:</strong>
                <span>{user.email}</span>
                <br/>
                <br/>
                <strong>Contact:</strong>
                <span>{user.contact}</span>
                <br/>
                <br/>
                <Link to="/">
                <button children="btn btn-edit">Go Back</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default View;