import React from 'react'
import { TwitterTimelineEmbed, TwitterFollowButton } from 'react-twitter-embed'
import GithubContributions from '@/components/GithubContributions'
import GoogleAdsense from '@/components/GoogleAdsense'

const SideBar: React.FC = () => {
  const twitterUser = process.env.TWITTER_USERNAME ?? 'vercel'
  return (
    <aside className='w-full mx-auto mt-3 md:mt-0 md:w-1/3 lg:w-1/4 bg-white p-3'>
      <TwitterTimelineEmbed sourceType="profile" screenName={twitterUser} options={ { height: 600 } } />
      <TwitterFollowButton screenName={twitterUser} />
      <GithubContributions />
      <GoogleAdsense />
    </aside>
  )
}

export default SideBar
