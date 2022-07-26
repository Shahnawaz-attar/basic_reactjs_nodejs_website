import React, { useEffect, useState } from 'react'
import axios from 'axios'
const API_URL = 'http://localhost:4000/api/blogs'

const Myblogs = () => {


  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        console.log(res.data)
        setBlogs(res.data)
      }
      )
      .catch(err => {
        console.log(err)
      }
      )
  }, [])

  return (
    <div className="container">
      <div className="row">

        {blogs.map((blog, index) => (
          <div className="col-lg-4 my-2" key={index} >
            <div className="card" >
              <img className="card-img-top" src={blog.coverImg} alt={blog.title} height="300" />
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.description.substring(0,150)+'...'}</p>
                <a href="/" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>

        ))}
      </div>
    </div>
  )
}

export default Myblogs