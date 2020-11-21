import React from 'react'
import Header from '@/components/Header'
import Head from 'next/head'
import SideBar from '@/components/SideBar'
import Footer from '@/components/Footer'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export interface Props {
  title: string | null
  keyword?: string | null
  isArticle: boolean
  image?: string | null
}

const Layout: React.FC<Props> = ({ title, children, keyword, isArticle, image }) => {
  const siteTitle = process.env.SITE_TITLE ?? 'Next.js Markdown Blog'
  const pageTitle = ((title != null && title !== '') ? `${title} | ${siteTitle}` : siteTitle)
  const pageType = (isArticle ? 'article' : 'blog')
  const description = process.env.DESCRIPTION
  const pageImage = ((image != null && image !== '') ? image : 'https://blog.gamou-tatsumi.com/favicon.png')
  const pageKeyword = ((keyword != null && keyword !== '') ? `<meta name="keyword" content=${keyword}>` : '')
  return (
    <>
      <div className='page bg-gray-200 flex flex-col min-h-screen'>
        <Head>
          <GoogleAnalytics />
          <link rel="icon" type="image/png" href="/favicon.png" />
          <title>{pageTitle}</title>
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={description} />
          {pageKeyword}
          <meta property="og:type" content={pageType} />
          <meta property="og:image" content={pageImage} />
          <meta property="og:site_name" content={siteTitle} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@gamoutatsumi" />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={pageImage} />
        </Head>
        <Header siteName={siteTitle} />
        <div className='container mx-auto my-3 flex flex-wrap justify-between'>
          <main className='w-full md:w-2/3 bg-white mx-auto p-3'>
            {children}
          </main>
          <SideBar />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Layout
