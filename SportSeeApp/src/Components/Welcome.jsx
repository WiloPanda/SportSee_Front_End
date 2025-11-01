import React from 'react'

const Welcome = ({ name }) => {
  return ( 
    <h1 className='welcome'>Bonjour <span className='welcome__name'>{name}</span></h1>
  )
}

export default Welcome
