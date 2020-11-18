import React from 'react'
import Layout from '@/components/Layout'
import { NextPage } from 'next'

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
