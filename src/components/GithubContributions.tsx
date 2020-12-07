import React from 'react'
import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const GithubContributions: React.FC = () => {
  const userName = process.env.GITHUB_USERNAME

  if (userName === undefined) return (<></>)

  return (
    <>
      <h2 className='border-b-2 border-l-2 pl-2 my-3'>GitHub Activity</h2>
      <div className="github-link text-base">
        <FontAwesomeIcon
          className="mr-1"
          fixedWidth icon={['fab', 'github']} />
        <a href={`https://github.com/${userName}`}>{userName}</a>
      </div>
      <div className='text-center mt-2'>
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
