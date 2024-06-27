import React, {useState, useEffect} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";
import "./AddEdit.css";

const initialState ={
    name: "",
    email: "",
    contact: "",
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const {name, email, contact} = state;

    const navigate = useNavigate();

    const {id} = useParams();//update 

    //update
    useEffect(() => { 
        axios.get(`http://localhost:4000/api/get/${id}`)
             .then((resp) => setState({...resp.data[0]}));
    }, [id]);

    const handleSubmit = (e) => {

        e.preventDefault();

        if(!name || !email || !contact) {
            toast.error("Please fill all input fields");
        } else{
            if(!id) {
                axios.post("http://localhost:4000/api/post", {
                    name,
                    email,
                    contact,
                })
                .then(() => {
                    setState({name: "", email: "", contact: ""});
                })
                .catch((err) => toast.error(err.response.data));
    
                toast.success("Data Addeed Successfully");

            } else {
                axios.put(`http://localhost:4000/api/update/${id}`, {
                    name,
                    email,
                    contact,
                })
                .then(() => {
                    setState({name: "", email: "", contact: ""});
                })
                .catch((err) => toast.error(err.response.data));
    
                toast.success("Data Updated Successfully");
            }
            
            setTimeout(() => navigate("/"), 500);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({ ...state, [name]: value});
    }


  return (
    <div style={{marginTop: "100px"}}>

        <form style={{margin: "auto", padding:"15px", maxWidth:"400px",alignContent:"center"}}
        onSubmit={handleSubmit}>

            <label htmlFor="name">Name</label>
            <input
            type='text'
            id='name'
            name='name'
            placeholder='Enter Name'
            value={name || ""}
            onChange={handleInputChange}
            />

            <label htmlFor="email">Email</label>
            <input
            type='email'
            id='email'
            name='email'
            placeholder='Enter Email'
            value={email || ""}
            onChange={handleInputChange}
            />

            <label htmlFor="contact">Contact</label>
            <input
            type='number'
            id='contact'
            name='contact'
            placeholder='Enter Contact'
            value={contact || ""}
            onChange={handleInputChange}
            />
            <input className='btn btn-add' type='submit' value={id ? "Update" : "Save"}/>
            <Link to="/">
                <input className='btn btn-delete' type='button' value="Go Back"/>
            </Link>
        </form>
    </div>
  )
}

export default AddEdit;