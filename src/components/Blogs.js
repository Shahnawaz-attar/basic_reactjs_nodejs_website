import React from 'react'


const Blogs = (props) => {
 
  return (
    <div className="container">
        <div className="row">
          {props.blogs.map((blog, index) => {
            
            return (
        
                 <div className="col-lg-4 my-2" key={index}>
                 <div className="card" >
                     <img className="card-img-top" src={blog.url} alt={blog.url} height="300"  />
                     <div className="card-body">
                         <h5 className="card-title">{blog.name}</h5>
                         <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis impedit adipisci quae laboriosam doloremque commodi totam, facilis ratione sapiente. Voluptas laudantium, veniam dignissimos eveniet deserunt adipisci blanditiis maiores praesentium tempore?</p>
                         <a href="/" className="btn btn-primary">Go somewhere</a>
                     </div>
                     </div>
                 </div>
            )
          } )}
        </div>
    </div>
  )
}

export default Blogs


