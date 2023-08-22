import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const AllTweets = () => {

  const [allMyTweets, setAllMyTweets] = useState([]);

  useEffect(() => {

    async function fetchData() {
      try {
        const token = localStorage.getItem("token");

        // const url = "http://localhost:9000/api/v1/tweet/fetch"
        const url = "/api/v1/tweet/fetch"
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

    fetchData();

  }, [])


  return (
    <>
      <div>
        <div className="container">
          <h5 className='mt-5'>Your Timeline {localStorage.getItem("username")}</h5>
          <div className="mt-5">
            {allMyTweets.map(tweet => (
              <>
                <div className="card mb-5">
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-body-secondary">{tweet.username}</h6>
                    <p className="card-text">{tweet.text}</p>
                    <p className="card-text">Posted on: {moment(tweet.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
                  </div>
                </div>
              </>
            ))}
          </div>
          <hr></hr>
        </div>
      </div>
    </>
  )
}

export default AllTweets