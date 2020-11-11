import React from 'react'
import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header: React.FC = () => {
  return (
    <header className='Header'>
      <Link href='/post'>
        <a style={linkStyle}>Home</a>
      </Link>
    </header>
  )
}

export default Header
