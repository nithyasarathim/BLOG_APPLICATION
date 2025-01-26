import React from 'react';
import Logo from '.././assets/logo.png';

const Header = () => {
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
                <a href="#feeds" className="nav-link fw-bold" style={{ transition: 'color 0.3s', color: 'black', fontWeight: 'bold', fontSize: '1rem', marginRight:'1vw'}}>
                  Feeds
                </a>
              </li>
              <li className="nav-item">
                <a href="#categories" className="nav-link fw-bold" style={{ transition: 'color 0.3s', color: 'black', fontWeight: 'bold', fontSize: '1rem', marginRight:'1vw' }}>
                  Categories
                </a>
              </li>
              <li className="nav-item">
                <a href="#createPost" className="nav-link fw-bold" style={{ transition: 'color 0.3s', color: 'black', fontWeight: 'bold', fontSize: '1rem', marginRight:'1vw' }}>
                  Create Post
                </a>
              </li>
              <li className="nav-item">
                <a href="#profile" className="nav-link fw-bold" style={{ transition: 'color 0.3s', color: 'black', fontWeight: 'bold', fontSize: '1rem', marginRight:'1vw' }}>
                  Profile
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <style jsx>{`
        .nav-link:hover {
          color: rgb(0, 149, 255) !important;
        }
      `}</style>
    </header>
  );
};

export default Header;
