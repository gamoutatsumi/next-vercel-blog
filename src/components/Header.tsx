import React from 'react'
import Link from 'next/link'

interface Props {
  siteName: string
}

const linkStyle = {
  marginRight: 15
}

const Header: React.FC<Props> = ({ siteName }) => {
  return (
    <header className='Header'>
      <Link href='/post'>
        <a style={linkStyle}>{siteName}</a>
      </Link>
    </header>
  )
}

export default Header
