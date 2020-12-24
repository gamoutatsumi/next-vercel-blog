import React from 'react'
import Image from 'next/image'

import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome'

const GithubContributions: React.FC = () => {
  const userName = process.env.GITHUB_USERNAME

  if (userName === undefined) return (<></>)

  return (
    <>
      <h2 className='pl-2 my-3 border-b-2 border-l-2'>GitHub Activity</h2>
      <div className="text-base github-link">
        <FAIcon
          className="mr-1"
          fixedWidth icon={['fab', 'github']} />
        <a href={`https://github.com/${userName}`}>{userName}</a>
      </div>
      <div className='mt-2 text-center'>
        <a
          className='inline-block'
          href={`https://github.com/${userName}`}>
          <Image
            layout='intrinsic'
            quality={100}
            height={870}
            width={155}
            src={`https://grass-graph.moshimo.works/images/${userName}.png?rotate=90`} />
        </a>
      </div>
    </>
  )
}

export default GithubContributions
