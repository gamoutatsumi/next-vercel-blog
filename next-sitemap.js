require('dotenv').config()
module.exports = {
  siteUrl: process.env.BASE_URL,
  generateRobotsTxt: true,
  exclude: ['/404']
}
