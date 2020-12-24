import React from 'react'
import Link from 'next/link'

interface Props {
  siteName: string
}

const Header: React.FC<Props> = ({ siteName }) => {
  return (
    <header className='flex justify-between bg-white shadow-md'>
      <Link href='/post'>
        <a className='px-2 py-3 my-auto align-middle text-md md:text-xl'>{siteName}</a>
      </Link>
      <Link href='/privacypolicy'>
        <a className="px-2 my-auto text-sm md:text-md hover:bg-gray-300 duration-300 rounded-md">Privacy Policy</a>
      </Link>
    </header>
  )
}

export default Header
