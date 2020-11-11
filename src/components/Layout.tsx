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
    <div className='page'>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <title>{(title != null && title !== '') ? `${title} | ${siteTitle}` : siteTitle}</title>
      </Head>
      <Header />
      <main>
        {children}
      </main>
      <SideBar />
      <Footer />
    </div>
  )
}

export default Layout
