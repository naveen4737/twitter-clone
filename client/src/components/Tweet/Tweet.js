import React from 'react'

const Tweet = (props) => {
  return (
    <>
      <h4>{props.tweet.username}</h4>
      <p>{props.tweet.text}</p>
    </>
  )
}

export default Tweet