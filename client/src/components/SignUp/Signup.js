import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: ""
  })
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:9000/api/v1/users/register"
      const { data: res } = await axios.post(url, data)
      navigate("/login");
      console.log(res.message)
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message)
      }
    }
  }

  return (
    <>
      <div className="container">
        <h3 className='mt-5'>Twitter Clone</h3>
        <div className="mt-5">
          <form className="mt-4" onSubmit={handleSubmit}>
            <input type="text" className="form-control p-3 mt-3" id="title" name="username" value={data.username} onChange={handleChange} required placeholder='Enter your Name' />
            <input type="text" className="form-control p-3 mt-3" id="title" name="password" value={data.password} onChange={handleChange} required placeholder='Enter password' />
            <hr />
            <button className="btn btn-success px-4 py-3 mb-4" type="submit">Sign Up</button>
          </form>
          {error && (
            <div className="error">{error}</div>
          )}
          <br />
        </div>
        <div>
          <h4>Already a User?</h4>
          <Link to="/login">
            <button type="button" className="btn btn-success">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Signup;