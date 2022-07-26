import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'

const API_URL = 'http://localhost:4000/api/add_contact'

const Create_post = (props) => {
    const {id} = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState('Create Post')

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
        _id : ""
    })
    const [alert, setAlert] = useState({
        type: '',
        message: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value

        })
    }



    const ShowAler = (data) => {
        setAlert({
            type: data.type,
            message: data.message
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(API_URL, form).then(res => {
            if (res.data.status) {
                ShowAler({
                    type: 'success',
                    message: 'Your message has been sent successfully'
                });
                setTimeout(() => {
                    navigate('/crud/list')
                } , 2000);

            } else {
                ShowAler({
                    type: 'danger',
                    message: 'Something went wrong'
                })
            }

            setForm({ name: '', email: '', message: '' , _id : ''})
            setTimeout(() => {
                setAlert({ type: '', message: '' })
            }, 3000)

        }).catch(err => {
            console.log(err)
        })

    }
    // if id is not null then it will show edit form
    useEffect(() => {
        if (id) {
            setTitle('Edit Post')
            axios.get(`http://localhost:4000/api/edit_contact/${id}`).then(res => {
                setForm(res.data.contact)
              
            }
            ).catch(err => {
                console.log(err)
            }
            )
        }



    }
    , [id])






    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8 mx-auto mt-5">
                    <div className="card">
                        <div className="card-header"> <h2 className="card-title">{title}
                        <Link  to="/crud/list" className="btn btn-primary btn-sm float-right">List</Link>
                        </h2>
                        </div>
                        <div className="card-body">
                            <form>
                                {alert && <div className={`alert alert-${alert.type}`} role="alert" style={{ 'height': '50px' }}>
                                    {alert.message}
                                </div>}
                                <div className="form-group">
                                <input type="hidden" className="form-control"  value={form._id} onChange={handleChange} name='_id' />

                                    <label>Name</label>
                                    <input type="text" className="form-control" placeholder="Enter Name" value={form.name} onChange={handleChange} name='name' />
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" placeholder="Enter Email" value={form.email} onChange={handleChange} name='email' />
                                </div>
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea className="form-control" rows="6" placeholder="Enter Message" value={form.message} onChange={handleChange} name='message'></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create_post