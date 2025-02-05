import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://blogapp-backend-yyqy.onrender.com/blogs/recent');
        const data = await response.json();
        setBlogs(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mt-4">
      <br/>
      <br/>
      <center><h2 className="mb-4 center" style={{fontWeight:"500", color:"rgb(68, 68, 68)"}}>LATEST BLOGS</h2></center>
      <br/>
      <div className="row">
        {blogs.map((blog) => (
          <div key={blog._id} className="col-md-4 mb-4">
            <div
              className="card"
              style={{ maxHeight: '500px', cursor: 'pointer' }}
              onClick={() => navigate(`/blogs/${blog._id}`)} 
            >
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text" style={{ height: '100px', overflow: 'hidden' }}>
                  {blog.content.substring(0, 100)}...
                </p>
                <div>
                  <p><strong>Author:</strong> {blog.author}</p>
                  <p><strong>Category:</strong> {blog.category}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBlogs;
