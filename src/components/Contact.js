import React, { useState } from 'react'
import axios from 'axios'



const API_URL = 'http://localhost:4000/api/add_contact'
const Contact = () => {

    const [contact, setContact] = useState({
        name: '',
        email: '',
        message: ''
    })

    const [alert, setAlert] = useState({
        type: '',
        message: ''
    })


    const ShowAler = (data) => {
        setAlert({
            type: data.type,
            message: data.message
        })
    }

    const handleChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(API_URL, contact)
            .then(res => {

                if (res.data.status) {
                    ShowAler({
                        type: 'success',
                        message: 'Your message has been sent successfully'
                    })
                } else {
                    ShowAler({
                        type: 'danger',
                        message: 'Something went wrong'
                    })
                }

                setContact({ name: '', email: '', message: '' })
                setTimeout(() => {
                    setAlert({ type: '', message: '' })
                }, 5000)
            }
            )
            .catch(err => {
                console.log(err)
            }
            )
    }


    return (
        <div className="container">
            <div className="row">

                <div className="col-lg-8 mx-auto">

                    <h1 className="text-center">Contact</h1>
                    <hr />

                    <form>
                        {alert && <div className={`alert alert-${alert.type}`} role="alert" style={{ 'height': '50px' }}>
                            {alert.message}
                        </div>}
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" name="name" id="name" placeholder="Enter name" value={contact.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" name="email" id="email" placeholder="Enter email" value={contact.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Message</label>
                            <textarea className="form-control" name="message" id="message" placeholder="Enter name" value={contact.message} onChange={handleChange} />
                        </div>
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Contact