import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import ProfileModal from './ProfileModal';
import BlogModal from './BlogModal';

const Header = () => {
    const [isBlogModalOpen, setBlogModalOpen] = useState(false);

    const toggleBlogModal = () => {
        setBlogModalOpen(!isBlogModalOpen);
    };

    return (
        <header className="bg-white py-3">
            <div className="container d-flex align-items-center justify-content-between">
                <div>
                    <img src={Logo} alt="Logo" style={{ maxHeight: '40px' }} />
                </div>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a href="#subscribe" className="nav-link fw-bold" style={{ transition: 'color 0.3s', color: 'black', fontWeight: 'bold', fontSize: '1rem', marginRight: '1vw' }}>
                                    Subscribe
                                </a>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="btn btn-link nav-link fw-bold"
                                    style={{ transition: 'color 0.3s', color: 'black', fontWeight: 'bold', fontSize: '1rem', marginRight: '1vw' }}
                                    onClick={toggleBlogModal}
                                >
                                    My Blogs
                                </button>
                            </li>
                            <li className="nav-item">
                                <a href="/blogs/create" className="nav-link fw-bold" style={{ transition: 'color 0.3s', color: 'black', fontWeight: 'bold', fontSize: '1rem', marginRight: '1vw' }}>
                                    Create Blog
                                </a>
                            </li>
                            <li className="nav-item">
                                <ProfileModal />
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            {isBlogModalOpen && <BlogModal onClose={toggleBlogModal} />}
            <style jsx>{`
                .nav-link:hover {
                    color: rgb(0, 149, 255) !important;
                }
            `}</style>
        </header>
    );
};

export default Header;
