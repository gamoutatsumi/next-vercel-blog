import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer>
      &copy;{process.env.FIRST_PUBLISHED_YEAR ?? '1970'} {process.env.OWNER ?? 'John Smith'}
    </footer>
  )
}

console.log('hoge')

export default Footer
