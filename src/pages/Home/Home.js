import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";
import "./Home.css";

const Home = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:4000/api/get");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteData = (id) => {
        if(window.confirm("Are you sure?")){
            axios.delete(`http://localhost:4000/api/remove/${id}`);
            toast.success("Data Deleted Successfully");
            setTimeout(() => loadData(), 500);
        }
    };

  return (
    <div style={{marginTop: "150px"}}>
            <Link to="/addContact">
                <button className='btn btn-add'>Add</button>
            </Link>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th style={{textAlign: "center"}}>Id</th>
                    <th style={{textAlign: "center"}}>Name</th>
                    <th style={{textAlign: "center"}}>Email</th>
                    <th style={{textAlign: "center"}}>Contact</th>
                    <th style={{textAlign: "center"}}>Action</th>
                </tr>
            </thead>

            <tbody>
                {data.map((item, index) => {
                    return (
                        <tr key={item.id}>
                            <th scope='row'>{index+1}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.contact}</td>
                            <td className='btn-container'>
                                <Link to={`/update/${item.id}`}>
                                    <button className='btn btn-edit'>Edit</button>
                                </Link>
                                <button className='btn btn-delete' onClick={() => deleteData(item.id)}>Delete</button>
                                <Link to={`/view/${item.id}`}>
                                    <button className='btn btn-view'>View</button>
                                </Link>
                            </td>
                        </tr>
                    )
                })}
            </tbody>

        </table>
    </div>
  )
}

export default Home;