import React, { FunctionComponent } from 'react'
import Layout from '@/components/Layout'
import ReactMarkdown from 'react-markdown'
import toc from 'remark-toc'
import gfm from 'remark-gfm'
import GithubSlugger from 'github-slugger'

import { listContentFiles, PostContent, readContentFile } from '@/lib/content-loader'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import CodeBlock from '@/components/CodeBlock'

const slugger = new GithubSlugger()

interface HeadingProps {
  level: number
  children: JSX.Element[]
}

const Heading: FunctionComponent<HeadingProps> = (props) => {
  if (props.children == null || props.children === undefined) {
    return React.createElement('')
  }
  return React.createElement(
    `h${props.level}`,
    {
      id: slugger.slug(props.children[0].props.children)
    },
    props.children
  )
}

const Post: NextPage<PostContent> = ({ title, content, published }) => {
  return (
    <Layout title={title}>
      <div className="post-meta">
        <span>{published}</span>
      </div>
      <div>
        <h1>{title}</h1>
        <ReactMarkdown plugins={[[gfm], [toc, { heading: '目次' }]]} renderers={{ code: CodeBlock, heading: Heading }} source={content} />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const content = readContentFile({ category: params?.category, slug: params?.slug })
  return {
    props: {
      ...content
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = listContentFiles().map((filename) => readContentFile({ filename: filename })).map(post => ({
    params: {
      category: post.category,
      slug: post.slug
    }
  }))

  return { paths, fallback: false }
}

export default Post
