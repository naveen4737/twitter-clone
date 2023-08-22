import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import axios from 'axios'


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
          <h5 className='mt-5'>Your Timeline</h5>
          <div className="mt-5">
            {allMyTweets.map(tweet => (
              <div>
                <h4>{tweet.username}</h4>
                <p>{tweet.text}</p>
              </div>
            ))}
          </div>
          <hr></hr>
        </div>
      </div>
    </>
  )
}

export default AllTweets