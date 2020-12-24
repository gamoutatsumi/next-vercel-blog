import React from 'react'

import { TwitterTimelineEmbed, TwitterFollowButton } from 'react-twitter-embed'
import GithubContributions from '@/components/GithubContributions'
import GoogleAdsense from '@/components/GoogleAdsense'

const SideBar: React.FC = () => {
  const twitterUser = process.env.TWITTER_USERNAME ?? 'vercel'
  return (
    <aside className='w-full p-3 mx-auto mt-3 bg-white md:mt-0 md:w-1/3 lg:w-1/4'>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName={twitterUser}
        options={{ height: 600 }} />
      <TwitterFollowButton screenName={twitterUser} />
      <GithubContributions />
      <div className='text-center'>
        <GoogleAdsense />
      </div>
    </aside>
  )
}

export default SideBar
