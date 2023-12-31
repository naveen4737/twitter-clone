import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Following = () => {

  const [allFollowedUsers, setAllFollowedUsers] = useState([]);

  async function fetchFollowing() {
    try {
      const token = localStorage.getItem("token");

      const url = "/api/v1/users/followedusers"
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setAllFollowedUsers(response.data.following)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleUnfollow = async (username) => {
    try {
      const token = localStorage.getItem("token");
      const url = `/api/v1/users/unfollow`

      const data = {
        "usernameFollow": username
      }
      const response = await axios.put(url, data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.status == 200) {
        // tweet posted
        console.log("tweet deleted")
      }

      fetchFollowing();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFollowing();
  }, [])

  return (
    <>
      <div>
        <div className="container">
          <h5 className='mt-5'>Followed Users</h5>
          <div className="mt-5">
            {allFollowedUsers.map(follows => (
              <>
                <div className='mb-3'>
                  <h4>{follows.username}</h4>
                  <button onClick={() => { handleUnfollow(follows.username) }} className='btn btn-danger'>
                    Unfollow
                  </button>
                </div>
                <hr />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Following