const path = require('path')

module.exports = {
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src')
    }
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
    SITE_TITLE: 'インフラ系専門学生の日記',
    OWNER: 'Tatsumi Gamou',
    FIRST_PUBLISHED_YEAR: '2019',
    GITHUB_USERNAME: 'gamoutatsumi',
    TWITTER_USERNAME: 'gamoutatsumi',
    DESCRIPTION: 'インフラ系志望の専門学生が色々綴る予定のブログ'
  }
}
