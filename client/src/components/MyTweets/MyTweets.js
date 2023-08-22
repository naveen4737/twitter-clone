import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-modal';
import moment from 'moment';
import Message from '../Message/Message';

const MyTweets = () => {

  const [allMyTweets, setAllMyTweets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTweet, setSelectedTweet] = useState(null);
  const [message, setMessage] = useState(null);

  const handleEdit = (tweet) => {
    setSelectedTweet(tweet);
    setIsModalOpen(true);
  };

  const handleDelete = async (tweet) => {
    try {
      const token = localStorage.getItem("token");
      const url = `/api/v1/tweet/${tweet.id}`

      const response = await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(response)
      if (response.status == 200) {
        // tweet posted
        console.log("tweet deleted")
      }

      fetchData();
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        // setError(error.response.data.message)
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = ({ currentTarget: input }) => {
    setSelectedTweet({ ...selectedTweet, [input.name]: input.value });
  }

  const editTweet = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const url = "/api/v1/tweet/edit"

      const data = {
        text: selectedTweet.text,
        id: selectedTweet.id
      }
      const response = await axios.put(url, data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(response)
      if (response.status == 201) {
        // tweet updated
        setMessage(response.data.message)
      }

      fetchData();

    } catch (error) {
      console.log(error);
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        // setError(error.response.data.message)
      }
    }
  }

  async function fetchData() {
    try {
      const token = localStorage.getItem("token");

      const url = "/api/v1/tweet/mytweets"
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      })

      console.log(response)
      console.log(response.data)
      setAllMyTweets(response.data.tweets)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {

    fetchData();

  }, [message])


  return (
    <>
      <div>
        <div className="container">
          <h5 className='mt-5'>Your Tweets</h5>
          <div className="mt-5">
            {allMyTweets.map(tweet => (
              <>
                <div className="card mb-5">
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-body-secondary">{tweet.username}</h6>
                    <p className="card-text">{tweet.text}</p>
                    <p className="card-text">Posted on: {moment(tweet.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
                    <button onClick={() => { handleEdit(tweet) }} className='btn btn-secondary me-4'>
                      Edit
                    </button>
                    <button onClick={() => { handleDelete(tweet) }} className='btn btn-danger me-4'>
                      Delete
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
          <hr></hr>
        </div>
      </div >

      < Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Modal"
      >
        {/* <EditModalContent
          tweet={selectedTweet}
          closeModal={closeModal}
        /> */}
        {
          selectedTweet && <>
            <h5 className='mt-5'>Edit Tweet</h5>
            <div className="mt-5">
              <form onSubmit={editTweet}>
                <input type="text" className="form-control p-3 mb-3" id="title" name="text" value={selectedTweet.text} onChange={handleChange} required placeholder='Tweet something' />
                <button className="btn btn-primary px-4 py-3 mb-4" type="submit">Save</button>
              </form>
              {message && <Message text={message}/>}
              <br />
            </div>
          </>
        }
      </Modal >
    </>
  )
}

export default MyTweets