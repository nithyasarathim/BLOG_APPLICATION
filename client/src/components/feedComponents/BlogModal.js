import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'; // Import spinner from react-bootstrap

const BlogModal = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling

  // Get the user data from localStorage token
  const token = JSON.parse(localStorage.getItem('token'));
  const userName = token?.user?.name;

  const navigate = useNavigate();

  // Fetch blogs and filter by the author's name
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`http://blogapp-backend-yyqy.onrender.com/blogs`);
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();

        // Filter blogs where the author's name matches the user's name in the token
        const userBlogs = data.filter((blog) => blog.author === userName);

        setBlogs(userBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError(error.message); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [userName]);

  const handleBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" /> {/* Loading spinner */}
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="mb-4 text-center" style={{fontWeight:'lighter'}}>MY BLOGS</h2>
      {error ? ( 
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : blogs.length > 0 ? (
        <div className="row">
          {blogs.map((blog) => (
            <div key={blog._id} className="col-md-4 mb-4 d-flex justify-content-center">
              <div
                className="card shadow-sm border-light rounded p-3"
                onClick={() => handleBlogClick(blog._id)}
                style={{
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'center', 
                }}
              >
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.content.substring(0, 100)}...</p>
                <small className="text-muted">
                  <strong>Published on:</strong>{' '}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      ) : (
       <center> <p>You have not created any blogs yet.</p></center>
      )}
    </div>
  );
};

export default BlogModal;
