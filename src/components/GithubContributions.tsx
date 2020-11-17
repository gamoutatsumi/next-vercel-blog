import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export interface Props {
  userName: string
}

const GithubContributions: React.FC<Props> = ({ userName }) => {
  const iconStyle: React.CSSProperties = { fontSize: 14 }
  return (
    <>
      <div className="github-link">
        <FontAwesomeIcon style={iconStyle} icon={faGithub} />
        <a href={`https://github.com/${userName}`}>{userName}</a>
      </div>
      <div className='text-center'>
        <a className='inline-block' href={`https://github.com/${userName}`}>
          <img src={`https://grass-graph.moshimo.works/images/${userName}.png?rotate=90`} />
        </a>
      </div>
    </>
  )
}

export default GithubContributions
