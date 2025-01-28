import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/blogs')
            .then((response) => response.json())
            .then((data) => setBlogs(data))
            .catch((error) => console.error('Error fetching blogs:', error));
    }, []);

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-4 text-center" id='blogs'>
            <h2 className="mb-4 center" style={{fontWeight:"500", color:"rgb(68, 68, 68)"}}>BLOGS</h2>
            <div className="list-group d-flex flex-column align-items-center">
                {currentBlogs.map((blog) => (
                    <div
                    key={blog._id}
                    className="blog-container mb-4 p-3 border rounded shadow"
                    style={{
                        backgroundColor: '#f8f9fa',
                        transition: 'transform 0.2s',
                        cursor: 'pointer',
                        width: '80%',
                        padding: '2vw'
                    }}
                    onClick={() => navigate(`/blogs/${blog._id}`)}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <h5>{blog.title}</h5>
                    <hr style={{ border: '1px solid #dee2e6' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                        <p style={{ color: 'rgb(0, 208, 255)', fontWeight: 'bold', margin: 0 }}>
                            {blog.author} <span style={{ color: '#343a40' }}>| {blog.category}</span>
                        </p>
                        <p className="text-muted" style={{ margin: 0 }}>{new Date(blog.createdAt).toDateString()}</p>
                    </div>
                    <p style={{ color: '#343a40', lineHeight: '1.5', marginTop: '10px', padding: '10px 0' }}>
                        {blog.content.length > 200 ? `${blog.content.substring(0, 270)}...` : blog.content}
                    </p>
                </div>
                
                
                ))}
            </div>

            <Pagination className="mt-4 d-flex justify-content-center">
                {[...Array(Math.ceil(blogs.length / blogsPerPage)).keys()].map((number) => (
                    <Pagination.Item
                        key={number + 1}
                        active={number + 1 === currentPage}
                        onClick={() => paginate(number + 1)}
                    >
                        {number + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
};

export default BlogList;
