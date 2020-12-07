import React from 'react'
import { NextPage } from 'next'

import Layout from '@/components/Layout'

const NotFound: NextPage = () => {
  return (
    <>
      <Layout title="Not Found" isArticle={false}>
        <h1>404 Not Found</h1>
      </Layout>
    </>
  )
}

export default NotFound
