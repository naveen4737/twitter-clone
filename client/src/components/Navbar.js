import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">Twitter-Clone</Link>
          <button onClick={handleLogout}>
            Logout
          </button>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" to="/post">
                  Post tweet
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/following">
                  Following
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/mytweets">
                  My Tweets
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/notfollowing">
                  Not Following Users
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar