import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  display: block;
  margin: 0;
  border: none;
  width: 100%;
  border-radius: 0.4rem;

  &:focus {
    outline: none;
    box-shadow: 0.2rem 0.8rem 1.6rem #4527a0
  }
`

const Home = () => {
  return (
    <div>
      <Input />
    </div>
  )
}

export default Home
