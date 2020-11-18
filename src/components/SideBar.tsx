import React from 'react'
import { TwitterTimelineEmbed, TwitterFollowButton } from 'react-twitter-embed'
import GithubContributions from '@/components/GithubContributions'
import GoogleAdsense from '@/components/GoogleAdsense'

const SideBar: React.FC = () => {
  return (
    <aside className='w-5/6 mx-auto mt-3 md:mt-0 md:w-1/3 lg:w-1/4 bg-white p-3'>
      <TwitterTimelineEmbed sourceType="profile" screenName={process.env.TWITTER_USERNAME ?? 'gamoutatsumi'} options={ { height: 600 } } />
      <TwitterFollowButton screenName={process.env.TWITTER_USERNAME ?? 'gamoutatsumi'} />
      <h2 className='border-b-2 border-l-2 pl-2 my-3'>GitHub Activity</h2>
      <GithubContributions userName={process.env.GITHUB_USERNAME ?? 'gamoutatsumi'} />
      <GoogleAdsense />
    </aside>
  )
}

export default SideBar
