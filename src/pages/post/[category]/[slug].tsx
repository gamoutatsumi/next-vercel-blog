import React, { FunctionComponent } from 'react'
import Layout from '@/components/Layout'
import ReactMarkdown from 'react-markdown'
import toc from 'remark-toc'
import gfm from 'remark-gfm'
import GithubSlugger from 'github-slugger'
import unwrapimages from 'remark-unwrap-images'

import { listContentFiles, PostContent, readContentFile } from '@/lib/content-loader'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import CodeBlock from '@/components/CodeBlock'

const slugger = new GithubSlugger()

interface MarkdownProps {
  level?: number
  children: JSX.Element[]
  ordered: boolean
}

const Heading: FunctionComponent<MarkdownProps> = (props) => {
  if (props.children == null || props.children === undefined) {
    return React.createElement('')
  }
  if (props.level === undefined) {
    return React.createElement('')
  }
  if (props.level === 2) {
    return React.createElement(
      `h${props.level}`,
      {
        id: slugger.slug(props.children[0].props.children),
        className: 'my-2 border-b-2'
      },
      props.children
    )
  }
  return React.createElement(
    `h${props.level}`,
    {
      id: slugger.slug(props.children[0].props.children),
      className: 'my-2'
    },
    props.children
  )
}

const Paragraph: FunctionComponent<MarkdownProps> = (props) => {
  if (props.children == null || props.children === undefined) {
    return React.createElement('')
  }
  return React.createElement(
    'p',
    {
      className: 'mx-2 my-1 text-sm md:text-base'
    },
    props.children
  )
}

const List: FunctionComponent<MarkdownProps> = (props) => {
  if (props.children == null || props.children === undefined) {
    return React.createElement('')
  }
  if (props.ordered) {
    return React.createElement(
      'ol',
      {
        className: 'mx-2 my-1 pl-6 list-decimal'
      },
      props.children
    )
  } else {
    return React.createElement(
      'ul',
      {
        className: 'mx-4 my-1 pl-6 list-disc'
      },
      props.children
    )
  }
}

const Post: NextPage<PostContent> = ({ title, content, published, image, keyword }) => {
  return (
    <Layout title={title} isArticle={true} keyword={keyword} image={image}>
      <div className="post-meta">
        <span>{published}</span>
      </div>
      <div>
        <h1>{title}</h1>
        <ReactMarkdown plugins={[[unwrapimages], [gfm], [toc, { heading: '目次' }]]} renderers={{ code: CodeBlock, heading: Heading, paragraph: Paragraph, list: List }} source={content} />
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

  return { paths: paths, fallback: false }
}

export default Post
