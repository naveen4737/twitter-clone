import React, { useState, useEffect } from 'react'
import axios from 'axios'

const NotFollowing = () => {

  const [allUnfollowedUsers, setAllUnfollowedUsers] = useState([]);

  async function fetchNotFollowing() {
    try {
      const token = localStorage.getItem("token");
      const url = "/api/v1/users/notfollowingusers"
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAllUnfollowedUsers(response.data.notfollowing)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleFollow = async (username) => {
    try {
      const token = localStorage.getItem("token");
      const url = `/api/v1/users/follow`

      const data = {
        "usernameFollow": username
      }
      const response = await axios.put(url, data,{
          headers: { Authorization: `Bearer ${token}` }
        })

      fetchNotFollowing();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotFollowing();
  }, [])

  return (
    <>
      <div>
        <div className="container">
          <h5 className='mt-5'>Unfollowed Users</h5>
          <div className="mt-5">
            {allUnfollowedUsers.map(user => (
              <>
              <div className='mb-3'>
                <h4>{user.username}</h4>
                <button onClick={() => { handleFollow(user.username) }} className='btn btn-info'>
                  Follow
                </button>
              </div>
              <hr/>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFollowing