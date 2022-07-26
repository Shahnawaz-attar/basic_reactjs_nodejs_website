import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const API = 'http://localhost:4000/api/contact_list'

const Listpost = () => {

    const [contactList, setContactList] = useState([]);
    let slno = 0;
    
    useEffect(() => {
        axios.get(API).then(res => {
            setContactList(res.data.contacts)
        }
        ).catch(err => {
            console.log(err)
        }
        )
    
      
    }, [])

    const deleteContact = (id) => {
        axios.get(`http://localhost:4000/api/contact_delete/${id}`).then(res => {
            if (res.data.status) {
                setContactList(contactList.filter(contact => contact._id !== id))
            }
        }
        ).catch(err => {
            console.log(err)
        }
        )
    }
    



    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-10 mx-auto mt-5">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">List Post
                            <Link to="/crud" className="btn btn-primary btn-sm float-right">Create</Link>
                            </h2>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Img</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Message</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {        
                                    
                                        contactList.map((contact, index) => (
                                            <tr key={index}>
                                                <td>{++slno}</td>
                                                <td>
                                                    <img src={contact.file} alt="" height="50" />
                                                </td>
                                                <td>{contact.name}</td>
                                                <td>{contact.email}</td>
                                                <td>{contact.message}</td>
                                                <td>
                                                    <Link to={`/crud/edit/${contact._id}`} className="btn btn-primary btn-sm">Edit</Link> &nbsp;
                                                    <button className="btn btn-danger btn-sm" onClick={() => { deleteContact(contact._id) }}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                   }
                                </tbody>
                            </table>


                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Listpost