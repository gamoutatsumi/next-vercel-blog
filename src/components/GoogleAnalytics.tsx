import React from 'react'

interface GAProps {
  trackingId: string | null
}

const GoogleAnalytics: React.FC<GAProps> = ({ trackingId }) => {
  const isDisable = (process.env.NODE_ENV !== 'production') ? 'true' : 'false'
  if (trackingId === null) return (<></>)
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}></script>
      <script dangerouslySetInnerHTML={{
        __html: `
          window['ga-disable-${trackingId}'] = ${isDisable};
          window.dataLayer = window.dataLayer || [];
          function gtag() {dataLayer.push(arguments)};
          gtag('js', new Date());
          
          gtag('config', '${trackingId}', { page_path: window.location.pathname });
        `
      }} />
    </>
  )
}

export default GoogleAnalytics
