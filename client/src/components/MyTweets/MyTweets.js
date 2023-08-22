import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import axios from 'axios'
import Tweet from '../Tweet/Tweet';
import Modal from 'react-modal';


const MyTweets = () => {

  const [allMyTweets, setAllMyTweets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTweet, setSelectedTweet] = useState(null);

  const handleEdit = (tweet) => {
    console.log("edit clicked")
    console.log(tweet)
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
      if(response.status == 200){
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
      if(response.status == 201){
        // tweet posted
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

  }, [])


  return (
    <>
      <div>
        <div className="container">
          <h5 className='mt-5'>Your Tweets</h5>
          {/* <button onClick={fetchData}>
            Fetch
          </button> */}
          <div className="mt-5">
            {allMyTweets.map(tweet => (
              // <Tweet tweet={tweet} />
              <div>
                <h4>{tweet.username}</h4>
                <p>{tweet.text}</p>
                <button onClick={() => { handleEdit(tweet) }}>
                  Edit
                </button>
                <button onClick={() => { handleDelete(tweet) }}>
                  Delete
                </button>
              </div>
            ))}
          </div>
          <hr></hr>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Modal"
      >
        {/* <EditModalContent
          tweet={selectedTweet}
          closeModal={closeModal}
        /> */}
        {selectedTweet && <>
          <p>{selectedTweet.text}</p>
          <h5 className='mt-5'>Post a Tweet</h5>
          <div className="mt-5">
            <form className="mt-4" onSubmit={editTweet}>
              <input type="text" className="form-control p-3 mt-3" id="title" name="text" value={selectedTweet.text} onChange={handleChange} required placeholder='Tweet something' />
              <hr />
              <button className="btn btn-success px-4 py-3 mb-4" type="submit">Save</button>
            </form>
            {/* {error && (
              <div className="error">{error}</div>
            )} */}
            <br />
          </div>
        </>}
      </Modal>
    </>
  )
}

export default MyTweets