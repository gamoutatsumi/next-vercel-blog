import React from 'react'
import Link from 'next/link'

interface Props {
  siteName: string
}

const Header: React.FC<Props> = ({ siteName }) => {
  return (
    <header className='flex justify-between shadow-md bg-white'>
      <Link href='/post'>
        <a className='text-md md:text-xl my-auto align-middle px-2 py-3'>{siteName}</a>
      </Link>
      <Link href='privacypolicy'>
        <a className="text-sm md:text-md my-auto hover:bg-gray-300 px-2 duration-300 rounded-md">Privacy Policy</a>
      </Link>
    </header>
  )
}

export default Header
