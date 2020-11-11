import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import GithubContributions from './GithubContributions'

const SideBar: React.FC = () => {
  return (
    <aside>
      <TwitterTimelineEmbed sourceType="profile" screenName="gamoutatsumi" options={ { height: 400 } } />
      <GithubContributions userName="gamoutatsumi" />
    </aside>
  )
}

export default SideBar
