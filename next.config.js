const path = require('path')

module.exports = {
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src')
    }
    config.externals.push({
      dataLayer: 'dataLayer'
    })
    return config
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/post',
        permanent: true
      }
    ]
  },
  env: {
    SITE_TITLE: process.env.SITE_TITLE,
    OWNER: process.env.OWNER,
    FIRST_PUBLISHED_YEAR: process.env.FIRST_PUBLISHED_YEAR,
    GITHUB_USERNAME: process.env.GITHUB_USERNAME,
    TWITTER_USERNAME: process.env.TWITTER_USERNAME,
    DESCRIPTION: process.env.DESCRIPTION,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    GOOGLE_AD_CLIENT: process.env.GOOGLE_AD_CLIENT,
    GOOGLE_AD_SLOT: process.env.GOOGLE_AD_SLOT,
    BASE_URL: process.env.BASE_URL,
    REPO_URL: process.env.REPO_URL
  },
  images: {
    domains: ['grass-graph.moshimo.works']
  }
}
