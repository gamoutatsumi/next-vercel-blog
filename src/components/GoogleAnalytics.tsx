import React, { useEffect } from 'react'

const GoogleAnalytics: React.FC = () => {
  const trackingId = process.env.GA_TRACKING_ID ?? null
  const isDisable = (process.env.NODE_ENV !== 'production') ? 'true' : 'false'
  if (trackingId === null) return (<></>)
  useEffect(() => {
    window[`ga-disable-${trackingId}`] = isDisable
    window.dataLayer = window.dataLayer ?? []
    function gtag (...args): void {
      window.dataLayer.push(args)
    }
    gtag('js', new Date())
    gtag('config', trackingId, { page_push: window.location.pathname })
  })
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}></script>
    </>
  )
}

export default GoogleAnalytics
