import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'

const API_URL = 'http://localhost:4000/api/add_contact'

const Create_post = (props) => {
    const {id} = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState('Create Post')
    const [fileName, setFileName] = useState('')

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
        _id : "",
        file: ""
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
    const handleFileChange = (e) => {
        setForm({
            ...form,
            file: e.target.files[0]
        })
        setFileName(e.target.files[0].name)
    }



    const ShowAler = (data) => {
        setAlert({
            type: data.type,
            message: data.message
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('email', form.email);
        formData.append('message', form.message);
        formData.append('file', form.file);
        formData.append('id', id);
        let isUpdate = id ? true : false;
        formData.append('isUpdate', isUpdate);
        axios.post(API_URL, formData).then(res => {
            if (res.data.status) {
                ShowAler({
                    type: 'success',
                    message: 'Your message has been sent successfully'
                });
                setTimeout(() => {
                    navigate('/crud/list')
                } , 2000);

                setForm({ name: '', email: '', message: '' , _id : ''})
                setTimeout(() => {
                    setAlert({ type: '', message: '' })
                }, 3000)

                setFileName('')

            } else {
                ShowAler({
                    type: 'danger',
                    message: 'Something went wrong'
                })
            }

         

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
                                    <label>Upload File</label>
                                    <input type="file" className="form-control" onChange={handleFileChange} name='file'  />
                                </div>
                                { id  && <div className="form-group">
                                    <label>Your Image</label><br />
                                        <img src={`${form.file}`} alt="file" style={{ 'height': '100px' }} />
                                    </div>}
                                

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