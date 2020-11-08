import path from 'path'
import React from 'react'
import Layout from '@/components/Layout'
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'

import { listContentFiles, PostContent, readContentFile } from '@/lib/content-loader'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

const Post: NextPage<PostContent> = ({ title, content, published }) => {
  return (
    <Layout title={title}>
      <div className="post-meta">
        <span>{published}</span>
      </div>
      <div>
        {unified().use(parse).use(remark2react).processSync(content).result}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const content = readContentFile({ slug: params?.slug })

  return {
    props: {
      ...content
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = listContentFiles().map((filename) => ({
    params: {
      slug: path.parse(filename).name
    }
  }))

  return { paths, fallback: false }
}

export default Post
