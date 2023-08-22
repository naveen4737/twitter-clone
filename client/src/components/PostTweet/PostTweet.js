import React, { useState } from 'react';
import axios from 'axios';

const PostTweet = () => {

  const [data, setData] = useState({
    text: ""
  })
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const url = "/api/v1/tweet/create"
      console.log(token)
      const response = await axios.post(url, data, {
          headers: { Authorization: `Bearer ${token}` }
        })
      console.log(response)
      if(response.status == 201){
        // tweet posted
      }

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
        <h5 className='mt-5'>Post a Tweet</h5>
        <div className="mt-5">
          <form className="mt-4" onSubmit={handleSubmit}>
            <input type="text" className="form-control p-3 mt-3" id="title" name="text" value={data.text} onChange={handleChange} required placeholder='Tweet something' />
            <hr />
            <button className="btn btn-success px-4 py-3 mb-4" type="submit">Post</button>
          </form>
          {error && (
            <div className="error">{error}</div>
          )}
          <br />
        </div>
      </div>
    </>
  )
}

export default PostTweet