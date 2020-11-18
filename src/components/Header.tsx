import React from 'react'
import Link from 'next/link'

interface Props {
  siteName: string
}

const Header: React.FC<Props> = ({ siteName }) => {
  return (
    <header className='flex justify-between shadow-md bg-white'>
      <Link href='/post'>
        <a className='text-xl m-2'>{siteName}</a>
      </Link>
      <Link href='privacypolicy'>
        <a className="text-md m-2 hover:bg-gray-300 p-2 duration-300 rounded-md align-middle">Privacy Policy</a>
      </Link>
    </header>
  )
}

export default Header
