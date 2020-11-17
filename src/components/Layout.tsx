import React from 'react'
import Header from '@/components/Header'
import Head from 'next/head'
import SideBar from '@/components/SideBar'
import Footer from './Footer'

export interface Props {
  title: string | null
}

const Layout: React.FC<Props> = ({ title, children }) => {
  const siteTitle = process.env.SITE_TITLE ?? 'Next.js Markdown Blog'
  return (
    <div className='page bg-gray-200 flex flex-col min-h-screen'>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <title>{(title != null && title !== '') ? `${title} | ${siteTitle}` : siteTitle}</title>
      </Head>
      <Header siteName={siteTitle} />
      <div className='container mx-auto my-3 flex flex-wrap justify-between'>
        <main className='w-5/6 md:w-2/3 bg-white mx-auto p-3'>
          {children}
        </main>
        <SideBar />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
