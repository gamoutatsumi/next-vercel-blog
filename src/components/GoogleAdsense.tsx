import React from 'react'

const GoogleAdsense: React.FC = () => {
  return (
    <>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.GOOGLE_AD_CLIENT}
        data-ad-slot={process.env.GOOGLE_AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
      <script dangerouslySetInnerHTML={{
        __html: `
        if (window.adsbygoogle && '${process.env.NODE_ENV}' === 'production')
          window.adsbygoogle.push({});
        `
      }} />
    </>
  )
}

export default GoogleAdsense
