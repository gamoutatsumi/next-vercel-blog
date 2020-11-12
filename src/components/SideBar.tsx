import React from 'react'
import { TwitterTimelineEmbed, TwitterFollowButton } from 'react-twitter-embed'
import GithubContributions from '@/components/GithubContributions'

const SideBar: React.FC = () => {
  return (
    <aside>
      <TwitterTimelineEmbed sourceType="profile" screenName={process.env.TWITTER_USERNAME ?? 'gamoutatsumi'} options={ { height: 400 } } />
      <TwitterFollowButton screenName={process.env.TWITTER_USERNAME ?? 'gamoutatsumi'} />
      <GithubContributions userName={process.env.GITHUB_USERNAME ?? 'gamoutatsumi'} />
    </aside>
  )
}

export default SideBar
