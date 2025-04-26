 import React, { useEffect, useState } from "react";
 import axios from "axios"
 import {Link} from 'react-router-dom';

 export default function ListUserPage(){

    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);
    
    function getUsers(){
        axios.get('http://127.0.0.1:5000/listusers').then(function(response) {
            console.log(response.data);
            setUsers(response.data);
        });
    }

    const deleteUser = (id) => {
        axios.delete(`http://127.0.0.1:5000/userdelete/${id}`).then(function(response) {
            console.log(response.data);
            getUsers();
        });
        alert("successfully deleted");
    }


    return (
        <div>
            <div className="container h-100">
                <div className="row h-100">
                    <div className="col-12">
                        <p> <Link to = "/addnewuser" className="btn btn-success"> Add new user</Link></p>
                        <h1> List Users</h1>
                        <table class = "table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>email</th>
                                    <th>Date Added</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user,key) =>
                                <tr key = {key}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.date}</td>
                                    <td>
                                        <Link to = {`user/${user.id}/edit`} className="btn btn-success"> Edit </Link>
                                        <button onClick={() => deleteUser(user.id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
 }
