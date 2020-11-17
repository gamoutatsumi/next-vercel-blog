import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className='bg-white'>
      <p className='text-center'>&copy; {process.env.FIRST_PUBLISHED_YEAR ?? '1970'} {process.env.OWNER ?? 'John Smith'}</p>
    </footer>
  )
}

export default Footer
