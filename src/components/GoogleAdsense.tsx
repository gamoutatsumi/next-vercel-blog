import React, { useEffect } from 'react'

const GoogleAdsense: React.FC = () => {
  useEffect(() => {
    if (window.adsbygoogle !== undefined && process.env.NODE_ENV === 'production') {
      window.adsbygoogle.push({})
    }
  })

  return (
    <>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      <ins
        className="adsbygoogle inline-block w-full"
        style= {{ height: '250px' }}
        data-ad-client={process.env.GOOGLE_AD_CLIENT}
        data-ad-slot={process.env.GOOGLE_AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    </>
  )
}

export default GoogleAdsense
