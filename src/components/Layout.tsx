import React from 'react'
import Header from '@/components/Header'
import Head from 'next/head'

export interface Props {
  title: string | null
}

const Layout: React.FC<Props> = ({ title, children }) => {
  const siteTitle = 'インフラ系専門学生の日記'
  return (
    <div className='page'>
      <Head>
        <title>{(title != null) ? `${title} | ${siteTitle}` : siteTitle}</title>
      </Head>
      <Header />
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout
