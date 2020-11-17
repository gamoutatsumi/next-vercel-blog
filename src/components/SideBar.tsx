import React from 'react'
import { TwitterTimelineEmbed, TwitterFollowButton } from 'react-twitter-embed'
import GithubContributions from '@/components/GithubContributions'

const SideBar: React.FC = () => {
  return (
    <aside className='w-full lg:w-1/4 bg-white p-3'>
      <TwitterTimelineEmbed sourceType="profile" screenName={process.env.TWITTER_USERNAME ?? 'gamoutatsumi'} options={ { height: 400 } } />
      <TwitterFollowButton screenName={process.env.TWITTER_USERNAME ?? 'gamoutatsumi'} />
      <h2 className='border-b-2 border-l-2 pl-2 my-3'>GitHub Contributions</h2>
      <GithubContributions userName={process.env.GITHUB_USERNAME ?? 'gamoutatsumi'} />
    </aside>
  )
}

export default SideBar
