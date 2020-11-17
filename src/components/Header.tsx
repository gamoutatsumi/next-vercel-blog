import React from 'react'
import Link from 'next/link'

interface Props {
  siteName: string
}

const Header: React.FC<Props> = ({ siteName }) => {
  return (
    <header className='flex shadow-md bg-white'>
      <Link href='/post'>
        <a className='text-xl m-2'>{siteName}</a>
      </Link>
    </header>
  )
}

export default Header
