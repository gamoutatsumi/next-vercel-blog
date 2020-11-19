import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export interface Props {
  userName: string
}

const GithubContributions: React.FC<Props> = ({ userName }) => {
  return (
    <>
      <div className="github-link text-base">
        <FontAwesomeIcon className="mr-1" fixedWidth icon={['fab', 'github']} />
        <a href={`https://github.com/${userName}`}>{userName}</a>
      </div>
      <div className='text-center'>
        <a className='inline-block' href={`https://github.com/${userName}`}>
          <img style={{ height: '870px' }} src={`https://grass-graph.moshimo.works/images/${userName}.png?rotate=90`} />
        </a>
      </div>
    </>
  )
}

export default GithubContributions
