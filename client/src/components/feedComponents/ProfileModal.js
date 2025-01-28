import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfileModal = () => {
    const [showModal, setShowModal] = useState(false);
    const token = JSON.parse(localStorage.getItem('token'));
  
    const name = token?.user?.name || '';
    const email = token?.user?.email || '';

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/'; // Redirect to home
    };

    return (
        <>
            <li className="nav-item">
                <button
                    className="nav-link fw-bold"
                    style={{ transition: 'color 0.3s', color: 'black', fontWeight: 'bold', fontSize: '1rem', marginRight: '1vw' }}
                    onClick={() => setShowModal(true)}
                >
                    Profile
                </button>
            </li>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-center">Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            readOnly
                        />
                    </div>
                    <div className="form-group mt-2">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            readOnly
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Logout
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProfileModal;
