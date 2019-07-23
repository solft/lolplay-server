import React from 'react'
// TODO 선택된 곳의 스타일 지정 가능 나중에 참고
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <ul>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/about'>About</NavLink></li>
        <li><NavLink to='/replay'>Replay</NavLink></li>
      </ul>
    </div>
  )
}

export default Navbar
