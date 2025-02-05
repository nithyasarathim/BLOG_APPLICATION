import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../assets/blog-bg.png';

const CreateBlog = () => {
    const navigate = useNavigate();
    const tokenString = localStorage.getItem('token');
    let token = null;

    try {
        token = tokenString ? JSON.parse(tokenString).user : null;
    } catch (error) {
        console.error('Error parsing token:', error);
    }

    useEffect(() => {
        if (!token || !token.name) {
            navigate('/');
        }
    }, [navigate, token]);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState(token ? token.name : '');
    const [category, setCategory] = useState('');
    const [externalLink, setExternalLink] = useState(''); // New state for external link

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBlog = {
            title,
            content,
            author,
            category,
            externalLink, // Include externalLink in the new blog object
        };

        try {
            const response = await fetch('http://blogapp-backend-yyqy.onrender.com/blogs/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBlog),
            });

            if (!response.ok) {
                throw new Error('Failed to create blog post');
            }

            const data = await response.json();
            console.log('Blog created:', data);

            setTitle('');
            setContent('');
            setCategory('');
            setExternalLink(''); // Clear the external link field
            navigate('/feeds');
        } catch (error) {
            console.error('Error creating blog:', error);
            alert('Error creating blog. Please try again.');
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${Background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    width: '70%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h2 className='text-center' style={{ margin: '3%' }}> CREATE BLOG</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mt-2" style={{ display: 'flex', alignItems: 'center' }}>
                        <label className="mb-0" style={{ width: '100px' }}><strong>Author</strong></label>
                        <span style={{ color: 'rgb(0, 195, 255)', fontWeight: 'bold', paddingLeft: '10px' }}>
                            {author}
                        </span>
                    </div>

                    <div className="form-group mt-2" style={{ display: 'flex', alignItems: 'center' }}>
                        <label className="mb-0" style={{ width: '100px' }}><strong>Category</strong></label>
                        <select
                            className="form-control"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            style={{ width: '20%', marginLeft: '10px' }}
                        >
                            <option value="">Select a category</option>
                            <option value="Finance">Finance</option>
                            <option value="Education">Education</option>
                            <option value="Health">Health</option>
                            <option value="Travel">Travel</option>
                            <option value="Business">Business</option>
                            <option value="Relationship">Relationship</option>
                            <option value="Food">Food</option>
                        </select>
                    </div>

                    <div className="form-group mt-2" style={{ display: 'flex', alignItems: 'center' }}>
                        <label className="mb-0" style={{ width: '120px' }}><strong>Title</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            style={{ padding: '10px' }}
                        />
                    </div>

                    <div className="form-group mt-2">
                        <label><strong>Content</strong></label>
                        <textarea
                            className="form-control"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            style={{ padding: '10px' }}
                        />
                    </div>

                    {/* External Link field (optional) */}
                    <div className="form-group mt-2">
                        <label><strong>External Link (optional)</strong></label>
                        <input
                            type="url"
                            className="form-control"
                            value={externalLink}
                            onChange={(e) => setExternalLink(e.target.value)}
                            style={{ padding: '10px' }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary mt-3" style={{ width: 'auto', backgroundColor: 'rgb(0, 195, 255)' }}>
                        Post Blog
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;
