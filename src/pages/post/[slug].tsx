import path from 'path'
import React from 'react'
import Layout from '@/components/Layout'
import ReactMarkdown from 'react-markdown'

import { listContentFiles, PostContent, readContentFile } from '@/lib/content-loader'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import CodeBlock from '@/components/CodeBlock'

const Post: NextPage<PostContent> = ({ title, content, published }) => {
  return (
    <Layout title={title}>
      <div className="post-meta">
        <span>{published}</span>
      </div>
      <div>
        <ReactMarkdown renderers={{ code: CodeBlock }} source={content} />
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
