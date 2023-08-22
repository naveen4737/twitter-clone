import React from 'react'

const Message = (props) => {
  return (
    <>
      <p className={props.color}>{props.text}</p>
    </>
  )
}

export default Message